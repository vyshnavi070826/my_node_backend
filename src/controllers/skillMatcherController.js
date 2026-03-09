const DATA = require('../models/skillData');

// Skill similarity scoring (0-1)
const calculateSkillSimilarity = (userSkill, requiredSkill) => {
    const user = userSkill.toLowerCase().trim();
    const required = requiredSkill.toLowerCase().trim();
    
    // Exact match
    if (user === required) return 1.0;
    
    // Substring match
    if (user.includes(required) || required.includes(user)) return 0.8;
    
    // Category match (e.g., "programming" matches "python")
    const categories = {
        'programming': ['python', 'java', 'c++', 'javascript', 'coding', 'algorithm'],
        'data': ['data', 'analytics', 'analysis', 'statistics', 'ml', 'ai', 'machine learning'],
        'biology': ['genetics', 'molecular', 'cellular', 'immunology', 'biochemistry'],
        'lab': ['hplc', 'pcr', 'elisa', 'microscope', 'spectroscopy', 'chromatography'],
        'design': ['cad', 'autocad', 'fusion', 'solidworks', 'design', 'modeling'],
        'process': ['aspen', 'hysys', 'simulation', 'matlab', 'simulation', 'modeling'],
        'management': ['project', 'agile', 'scrum', 'leadership', 'team', 'communication']
    };
    
    for (const [category, keywords] of Object.entries(categories)) {
        const userInCategory = keywords.some(k => user.includes(k));
        const requiredInCategory = keywords.some(k => required.includes(k));
        if (userInCategory && requiredInCategory) return 0.6;
    }
    
    // Levenshtein distance for typos
    const distance = levenshteinDistance(user, required);
    const maxLen = Math.max(user.length, required.length);
    if (distance <= 2 && maxLen > 0) return 0.7;
    
    return 0;
};

// Levenshtein distance for fuzzy matching
const levenshteinDistance = (str1, str2) => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) matrix[i] = [i];
    for (let j = 0; j <= str1.length; j++) matrix[0][j] = j;
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[str2.length][str1.length];
};

// Calculate match percentage for a job
const matchJobToSkills = (job, userSkills) => {
    if (!job.requiredSkills || job.requiredSkills.length === 0) return 0;
    
    const userSkillsArray = userSkills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
    
    if (userSkillsArray.length === 0) return 0;
    
    // Calculate match for each required skill
    const skillMatches = job.requiredSkills.map(requiredSkill => {
        const maxSimilarity = Math.max(
            ...userSkillsArray.map(userSkill => 
                calculateSkillSimilarity(userSkill, requiredSkill)
            )
        );
        return maxSimilarity;
    });
    
    // Overall confidence: average of matched required skills
    const matchedCount = skillMatches.filter(m => m > 0).length;
    const avgMatch = skillMatches.reduce((a, b) => a + b, 0) / skillMatches.length;
    const confidence = avgMatch * 100;
    
    return {
        confidence: Math.round(confidence),
        matchedSkills: job.requiredSkills.filter((skill, idx) => skillMatches[idx] > 0),
        remainingSkills: job.requiredSkills.filter((skill, idx) => skillMatches[idx] === 0)
    };
};

// Main skill matcher endpoint
exports.matchSkillsToJobs = async (req, res) => {
    try {
        const { skills, department = 'all' } = req.body;
        
        if (!skills || skills.trim().length === 0) {
            return res.status(400).json({ 
                error: 'Please provide at least one skill' 
            });
        }
        
        const DATA = require('../models/skillData');
        
        // Collect all jobs from selected department(s)
        let allJobs = [];
        const departments = department === 'all' 
            ? ['chem-eng', 'biotech', 'bioinfo', 'bioeng-nano', 'chem']
            : [department];
        
        departments.forEach(dept => {
            if (DATA[dept] && DATA[dept].jobsEnhanced) {
                DATA[dept].jobsEnhanced.forEach(job => {
                    allJobs.push({ ...job, department: dept });
                });
            }
        });
        
        // Match skills to jobs
        const matchedJobs = allJobs
            .map(job => {
                const match = matchJobToSkills(job, skills);
                return {
                    ...job,
                    ...match,
                    learningResources: job.learningResources || []
                };
            })
            .filter(job => job.confidence > 0)
            .sort((a, b) => b.confidence - a.confidence);
        
        res.status(200).json({
            success: true,
            skillsProvided: skills.split(',').map(s => s.trim()),
            totalMatches: matchedJobs.length,
            matches: matchedJobs.slice(0, 15), // Top 15 matches
            topMatch: matchedJobs.length > 0 ? {
                ...matchedJobs[0],
                topOpportunity: true
            } : null
        });
        
    } catch (error) {
        console.error('Skill matching error:', error);
        res.status(500).json({ 
            error: 'Error matching skills to jobs',
            details: error.message 
        });
    }
};

// Get all available job skills for autocomplete
exports.getAvailableSkills = async (req, res) => {
    try {
        const DATA = require('../models/skillData');
        
        const allSkills = new Set();
        
        ['chem-eng', 'biotech', 'bioinfo', 'bioeng-nano', 'chem'].forEach(dept => {
            if (DATA[dept] && DATA[dept].jobsEnhanced) {
                DATA[dept].jobsEnhanced.forEach(job => {
                    if (job.requiredSkills && Array.isArray(job.requiredSkills)) {
                        job.requiredSkills.forEach(skill => allSkills.add(skill));
                    }
                });
            }
        });
        
        res.status(200).json({
            success: true,
            availableSkills: Array.from(allSkills).sort()
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error fetching available skills' 
        });
    }
};

// Get learning resources for a specific skill
exports.getLearningResources = async (req, res) => {
    try {
        const { skill } = req.params;
        const DATA = require('../models/skillData');
        
        if (!DATA.learningResources || !DATA.learningResources[skill]) {
            return res.status(404).json({ 
                error: `No learning resources found for skill: ${skill}` 
            });
        }
        
        res.status(200).json({
            success: true,
            skill,
            resources: DATA.learningResources[skill]
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error fetching learning resources' 
        });
    }
};
