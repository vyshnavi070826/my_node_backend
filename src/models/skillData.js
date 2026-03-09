// Enhanced Job Skills Data with Learning Resources
// This module provides skill requirements and learning resources for all job roles across departments

const skillData = {
    'chem-eng': {
        jobsEnhanced: [
            {
                title: "Process Design Engineer",
                salary: "₹7-16 LPA",
                companies: ["Reliance", "IOCL", "Honeywell"],
                jd: "Design industrial plant processes and steady-state simulations.",
                requiredSkills: ["Process Design", "Thermodynamics", "Heat Transfer", "ASPEN Plus", "MATLAB"],
                coreSkills: ["Process Design", "Thermodynamics", "ASPEN Plus"],
                learningResources: {
                    "Process Design": [
                        { name: "NPTEL - Process Engineering", url: "https://nptel.ac.in/courses/103106094", provider: "NPTEL" },
                        { name: "Process Design Fundamentals", url: "https://www.coursera.org/learn/process-design", provider: "Coursera" }
                    ],
                    "ASPEN Plus": [
                        { name: "ASPEN Plus Tutorials - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" },
                        { name: "Aspen Training Course", url: "https://www.aspentech.com/training", provider: "AspenTech" }
                    ],
                    "MATLAB": [
                        { name: "MATLAB for Engineers - NPTEL", url: "https://nptel.ac.in/courses/106108048", provider: "NPTEL" },
                        { name: "MATLAB Onramp", url: "https://www.mathworks.com/learn/tutorials/matlab-onramp.html", provider: "MathWorks" }
                    ]
                }
            },
            {
                title: "Chemical Engineer",
                salary: "₹8-18 LPA",
                companies: ["Shell", "ExxonMobil", "Chevron"],
                jd: "Oversee chemical production and process optimization.",
                requiredSkills: ["Chemical Process Engineering", "Reaction Engineering", "Fluid Mechanics", "HYSYS", "Process Control"],
                coreSkills: ["Chemical Process Engineering", "Reaction Engineering", "HYSYS"],
                learningResources: {
                    "Reaction Engineering": [
                        { name: "NPTEL - Reaction Engineering", url: "https://nptel.ac.in/courses/103106150", provider: "NPTEL" },
                        { name: "Chemical Reaction Engineering Online", url: "https://www.edx.org/course/reaction-engineering", provider: "edX" }
                    ],
                    "HYSYS": [
                        { name: "HYSYS Simulation Tutorials", url: "https://www.honey-well.com/training", provider: "Honeywell" },
                        { name: "Chemical Process Simulation - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" }
                    ],
                    "Process Control": [
                        { name: "Process Control - NPTEL", url: "https://nptel.ac.in/courses/103106136", provider: "NPTEL" }
                    ]
                }
            },
            {
                title: "Production Engineer",
                salary: "₹6-14 LPA",
                companies: ["BASF", "Dow", "Syngenta"],
                jd: "Manage production operations and efficiency.",
                requiredSkills: ["Production Management", "Safety Management", "Statistical Analysis", "Six Sigma", "Leadership"],
                coreSkills: ["Production Management", "Safety Management", "Six Sigma"],
                learningResources: {
                    "Production Management": [
                        { name: "Operations Management - NPTEL", url: "https://nptel.ac.in/courses/110106150", provider: "NPTEL" }
                    ],
                    "Six Sigma": [
                        { name: "Six Sigma Green Belt - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" },
                        { name: "Lean Six Sigma Fundamentals", url: "https://www.coursera.org/learn/six-sigma", provider: "Coursera" }
                    ],
                    "Safety Management": [
                        { name: "Industrial Safety - NPTEL", url: "https://nptel.ac.in/courses/114107163", provider: "NPTEL" }
                    ]
                }
            }
        ]
    },
    'biotech': {
        jobsEnhanced: [
            {
                title: "Immunology Scientist",
                salary: "₹10-18 LPA",
                companies: ["Biocon", "Bharat Biotech", "Pfizer"],
                jd: "Research antibodies and immune responses for therapeutics.",
                requiredSkills: ["Immunology", "Flow Cytometry", "Antibody Design", "ELISA", "Cell Culture"],
                coreSkills: ["Immunology", "Flow Cytometry", "Antibody Design"],
                learningResources: {
                    "Immunology": [
                        { name: "Immunology: Immune Response - NPTEL", url: "https://nptel.ac.in/courses/102104043", provider: "NPTEL" },
                        { name: "Immunology Course", url: "https://www.coursera.org/learn/immunology", provider: "Coursera" }
                    ],
                    "Flow Cytometry": [
                        { name: "Flow Cytometry Basics - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" }
                    ],
                    "ELISA": [
                        { name: "ELISA Techniques - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" }
                    ]
                }
            },
            {
                title: "Genetics Scientist",
                salary: "₹5-10 LPA",
                companies: ["Serum Institute", "Novartis", "GSK"],
                jd: "Study genetic markers for disease research and diagnostics.",
                requiredSkills: ["Genetics", "Molecular Biology", "DNA Sequencing", "PCR", "Bioinformatics"],
                coreSkills: ["Genetics", "Molecular Biology", "DNA Sequencing"],
                learningResources: {
                    "Genetics": [
                        { name: "Genetics - NPTEL", url: "https://nptel.ac.in/courses/102104054", provider: "NPTEL" },
                        { name: "Human Genetics", url: "https://www.coursera.org/learn/genetics", provider: "Coursera" }
                    ],
                    "DNA Sequencing": [
                        { name: "Next Generation Sequencing - NPTEL", url: "https://nptel.ac.in/courses/102107048", provider: "NPTEL" }
                    ]
                }
            },
            {
                title: "Molecular Biologist",
                salary: "₹8-16 LPA",
                companies: ["Roche", "Abbott", "Merck"],
                jd: "Investigate molecular mechanisms and gene expression.",
                requiredSkills: ["Molecular Biology", "Protein Analysis", "Gene Expression", "Western Blotting", "RT-PCR"],
                coreSkills: ["Molecular Biology", "Gene Expression", "Protein Analysis"],
                learningResources: {
                    "Molecular Biology": [
                        { name: "Molecular Biology - NPTEL", url: "https://nptel.ac.in/courses/102104041", provider: "NPTEL" },
                        { name: "Molecular Biology Specialization", url: "https://www.coursera.org/specializations/molecular-biology", provider: "Coursera" }
                    ],
                    "Gene Expression": [
                        { name: "Gene Expression & Regulation - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" }
                    ]
                }
            },
            {
                title: "Bioprocess Engineer",
                salary: "₹8-16 LPA",
                companies: ["Biocon", "Bharat Biotech", "Lupin"],
                jd: "Optimize fermentation and bioprocess scale-up.",
                requiredSkills: ["Bioprocess Engineering", "Fermentation", "Bioreactor Design", "Scale-up", "Downstream Processing"],
                coreSkills: ["Bioprocess Engineering", "Fermentation", "Bioreactor Design"],
                learningResources: {
                    "Bioprocess Engineering": [
                        { name: "Bioprocess Engineering - NPTEL", url: "https://nptel.ac.in/courses/103106092", provider: "NPTEL" }
                    ],
                    "Fermentation": [
                        { name: "Fermentation Technology - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" }
                    ],
                    "Downstream Processing": [
                        { name: "Protein Purification - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" }
                    ]
                }
            }
        ]
    },
    'bioinfo': {
        jobsEnhanced: [
            {
                title: "Bioinformatician",
                salary: "₹8-15 LPA",
                companies: ["Wipro", "TCS", "Infosys"],
                jd: "Analyze genomic data and develop computational models.",
                requiredSkills: ["Python", "Genomics Data Analysis", "BLAST", "R Programming", "Machine Learning"],
                coreSkills: ["Python", "Genomics Data Analysis", "R Programming"],
                learningResources: {
                    "Python": [
                        { name: "Python for Bioinformatics - NPTEL", url: "https://nptel.ac.in/courses/106104184", provider: "NPTEL" },
                        { name: "Python for Data Analysis", url: "https://www.coursera.org/learn/python-data-analysis", provider: "Coursera" }
                    ],
                    "R Programming": [
                        { name: "R Programming - NPTEL", url: "https://nptel.ac.in/courses/106104185", provider: "NPTEL" }
                    ],
                    "Machine Learning": [
                        { name: "Machine Learning - NPTEL", url: "https://nptel.ac.in/courses/106108137", provider: "NPTEL" },
                        { name: "Machine Learning Specialization", url: "https://www.coursera.org/specializations/machine-learning", provider: "Coursera" }
                    ]
                }
            },
            {
                title: "Data Scientist",
                salary: "₹10-20 LPA",
                companies: ["IBM", "Google", "Amazon"],
                jd: "Apply ML to biological data analysis.",
                requiredSkills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics"],
                coreSkills: ["Python", "Machine Learning", "SQL"],
                learningResources: {
                    "Machine Learning": [
                        { name: "Machine Learning - NPTEL", url: "https://nptel.ac.in/courses/106108137", provider: "NPTEL" }
                    ],
                    "SQL": [
                        { name: "Database Design & SQL - NPTEL", url: "https://nptel.ac.in/courses/106105173", provider: "NPTEL" }
                    ],
                    "Data Visualization": [
                        { name: "Data Visualization with Tableau", url: "https://www.coursera.org/learn/data-visualization", provider: "Coursera" }
                    ]
                }
            }
        ]
    },
    'bioeng-nano': {
        jobsEnhanced: [
            {
                title: "Nanotechnology Engineer",
                salary: "₹8-16 LPA",
                companies: ["Nanotech Industries", "ITC"],
                jd: "Design and test nano-scale devices.",
                requiredSkills: ["Nanotechnology", "Materials Science", "Characterization", "TEM", "CAD Design"],
                coreSkills: ["Nanotechnology", "Materials Science", "Characterization"],
                learningResources: {
                    "Nanotechnology": [
                        { name: "Nanotechnology - NPTEL", url: "https://nptel.ac.in/courses/116105059", provider: "NPTEL" }
                    ],
                    "Materials Science": [
                        { name: "Materials Science - NPTEL", url: "https://nptel.ac.in/courses/106105149", provider: "NPTEL" }
                    ],
                    "CAD Design": [
                        { name: "CAD for Engineers - NPTEL", url: "https://nptel.ac.in/courses/112105173", provider: "NPTEL" }
                    ]
                }
            },
            {
                title: "Biomedical Device Engineer",
                salary: "₹7-15 LPA",
                companies: ["Stryker", "Medtronic"],
                jd: "Develop implantable and diagnostic medical devices.",
                requiredSkills: ["Biomedical Engineering", "Device Design", "Biocompatibility", "Regulatory Affairs", "Prototyping"],
                coreSkills: ["Biomedical Engineering", "Device Design", "Biocompatibility"],
                learningResources: {
                    "Biomedical Engineering": [
                        { name: "Biomedical Engineering - NPTEL", url: "https://nptel.ac.in/courses/103106143", provider: "NPTEL" }
                    ],
                    "Device Design": [
                        { name: "Medical Device Design - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" }
                    ]
                }
            }
        ]
    },
    'chem': {
        jobsEnhanced: [
            {
                title: "Organic Chemist",
                salary: "₹6-12 LPA",
                companies: ["BASF", "Syngenta", "Dow"],
                jd: "Develop new organic compounds and synthesis routes.",
                requiredSkills: ["Organic Synthesis", "Reaction Mechanisms", "NMR Spectroscopy", "Chromatography", "Retrosynthesis"],
                coreSkills: ["Organic Synthesis", "NMR Spectroscopy", "Chromatography"],
                learningResources: {
                    "Organic Synthesis": [
                        { name: "Organic Chemistry - NPTEL", url: "https://nptel.ac.in/courses/104105143", provider: "NPTEL" },
                        { name: "Organic Synthesis Strategies", url: "https://www.coursera.org/learn/organic-chemistry", provider: "Coursera" }
                    ],
                    "NMR Spectroscopy": [
                        { name: "Spectroscopy - NPTEL", url: "https://nptel.ac.in/courses/104104113", provider: "NPTEL" }
                    ],
                    "Retrosynthesis": [
                        { name: "Retrosynthetic Analysis - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" }
                    ]
                }
            },
            {
                title: "Analytical Chemist",
                salary: "₹6-12 LPA",
                companies: ["Novartis", "GSK", "Abbvie"],
                jd: "Conduct quality control and analytical testing.",
                requiredSkills: ["Analytical Chemistry", "HPLC", "Mass Spectrometry", "Quality Control", "Data Analysis"],
                coreSkills: ["Analytical Chemistry", "HPLC", "Mass Spectrometry"],
                learningResources: {
                    "Analytical Chemistry": [
                        { name: "Analytical Chemistry - NPTEL", url: "https://nptel.ac.in/courses/104104114", provider: "NPTEL" }
                    ],
                    "HPLC": [
                        { name: "Chromatography Techniques - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" }
                    ],
                    "Quality Control": [
                        { name: "QA/QC Fundamentals - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" }
                    ]
                }
            },
            {
                title: "Research Chemist",
                salary: "₹7-14 LPA",
                companies: ["Merck", "Roche", "Pfizer"],
                jd: "Investigate new chemical reactions and mechanisms.",
                requiredSkills: ["Physical Chemistry", "Theoretical Chemistry", "Reaction Mechanisms", "Computational Chemistry", "Research Methodology"],
                coreSkills: ["Physical Chemistry", "Reaction Mechanisms", "Computational Chemistry"],
                learningResources: {
                    "Physical Chemistry": [
                        { name: "Physical Chemistry - NPTEL", url: "https://nptel.ac.in/courses/104104112", provider: "NPTEL" }
                    ],
                    "Computational Chemistry": [
                        { name: "Computational Chemistry - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL" }
                    ]
                }
            }
        ]
    },

    // Global Learning Resources Hub
    learningResources: {
        "Python": [
            { name: "Python for Data Science - NPTEL", url: "https://nptel.ac.in/courses/106104184", provider: "NPTEL", level: "Beginner" },
            { name: "Python Programming - Coursera", url: "https://www.coursera.org/learn/python", provider: "Coursera", level: "Beginner" },
            { name: "Advanced Python - NPTEL", url: "https://nptel.ac.in", provider: "NPTEL", level: "Advanced" }
        ],
        "MATLAB": [
            { name: "MATLAB Fundamentals - NPTEL", url: "https://nptel.ac.in/courses/106108048", provider: "NPTEL", level: "Beginner" },
            { name: "MATLAB Onramp - MathWorks", url: "https://www.mathworks.com/learn/tutorials/matlab-onramp.html", provider: "MathWorks", level: "Beginner" }
        ],
        "Machine Learning": [
            { name: "Machine Learning - NPTEL", url: "https://nptel.ac.in/courses/106108137", provider: "NPTEL", level: "Intermediate" },
            { name: "Machine Learning Specialization - Coursera", url: "https://www.coursera.org/specializations/machine-learning", provider: "Coursera", level: "Intermediate" }
        ],
        "R Programming": [
            { name: "R for Data Science - NPTEL", url: "https://nptel.ac.in/courses/106104185", provider: "NPTEL", level: "Beginner" },
            { name: "R Programming - Coursera", url: "https://www.coursera.org/learn/r-programming", provider: "Coursera", level: "Beginner" }
        ]
    }
};

module.exports = skillData;
