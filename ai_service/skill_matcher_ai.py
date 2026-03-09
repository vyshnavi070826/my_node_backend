"""
AI Skill Matcher Service
- Uses HuggingFace Transformers for semantic embeddings
- Calculates cosine similarity between user skills and job requirements
- Provides confidence scores based on vector similarity
- Runs as a Flask service accessible via Node.js backend
"""

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer, util
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from dotenv import load_dotenv
import logging

load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load pre-trained semantic embedding model
# Using all-MiniLM-L6-v2: lightweight, fast, accurate for semantic similarity
logger.info("Loading semantic embedding model...")
model = SentenceTransformer('all-MiniLM-L6-v2')
logger.info("✓ Model loaded successfully")

# Load job skills data
# Get path relative to this script
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
skill_data_path = os.path.join(parent_dir, 'src', 'models', 'skillData.json')

logger.info(f"Loading skill data from: {skill_data_path}")
with open(skill_data_path, 'r') as f:
    SKILL_DATA = json.load(f)
    
logger.info(f"✓ Loaded {sum(len(jobs) for jobs in SKILL_DATA.values())} jobs across {len(SKILL_DATA)} departments")

class AISkillMatcher:
    """
    Machine Learning based skill matching using semantic embeddings
    """
    
    def __init__(self, model):
        self.model = model
        self.job_embeddings_cache = {}
        self.skill_embeddings_cache = {}
        self._initialize_embeddings()
    
    def _initialize_embeddings(self):
        """Pre-compute embeddings for all jobs and skills"""
        logger.info("Pre-computing job and skill embeddings...")
        
        # Get all unique skills across departments
        all_skills = set()
        for dept_jobs in SKILL_DATA.values():
            for job in dept_jobs:
                if 'requiredSkills' in job:
                    all_skills.update(job['requiredSkills'])
        
        # Encode all skills
        skill_list = list(all_skills)
        skill_embeddings = self.model.encode(skill_list, convert_to_tensor=True)
        self.skill_embeddings_cache = {skill: emb for skill, emb in zip(skill_list, skill_embeddings)}
        
        logger.info(f"✓ Encoded {len(all_skills)} unique skills")
    
    def encode_text(self, text):
        """Encode text to embedding using semantic model"""
        return self.model.encode(text, convert_to_tensor=True)
    
    def calculate_semantic_similarity(self, user_skill, job_skills):
        """
        Calculate semantic similarity between user skill and job requirements
        Returns: similarity score (0-1)
        """
        # Encode user skill
        user_embedding = self.encode_text(user_skill)
        
        # Calculate similarity with each job skill
        similarities = []
        for job_skill in job_skills:
            if job_skill in self.skill_embeddings_cache:
                job_embedding = self.skill_embeddings_cache[job_skill]
            else:
                job_embedding = self.encode_text(job_skill)
            
            # Cosine similarity
            similarity = util.pytorch_cos_sim(user_embedding, job_embedding).item()
            similarities.append({
                'skill': job_skill,
                'similarity': float(similarity)
            })
        
        # Return best match
        if similarities:
            best_match = max(similarities, key=lambda x: x['similarity'])
            return best_match['similarity'], best_match['skill']
        return 0.0, None
    
    def match_user_to_jobs(self, user_skills_text, department='all'):
        """
        Main AI matching function
        - Parse user skills from text description
        - Calculate semantic similarity to all jobs
        - Return ranked matches with confidence
        """
        
        # Parse user skills from text (description or comma-separated)
        user_skills_raw = [s.strip() for s in user_skills_text.split(',')]
        
        # Encode user skills for context understanding
        user_skill_embeddings = self.model.encode(user_skills_raw, convert_to_tensor=True)
        
        # Get user skills semantic profile (average embedding)
        user_profile_embedding = np.mean(
            [emb.cpu().numpy() for emb in user_skill_embeddings],
            axis=0
        )
        
        matches = []
        
        # Iterate through departments
        department_list = [department] if department != 'all' else SKILL_DATA.keys()
        
        for dept in department_list:
            if dept not in SKILL_DATA:
                continue
            
            for job in SKILL_DATA[dept]:
                required_skills = job.get('requiredSkills', [])
                core_skills = job.get('coreSkills', [])
                
                if not required_skills:
                    continue
                
                # Encode job requirements
                job_skill_embeddings = self.model.encode(required_skills, convert_to_tensor=True)
                job_profile_embedding = np.mean(
                    [emb.cpu().numpy() for emb in job_skill_embeddings],
                    axis=0
                )
                
                # Calculate profile-level similarity (overall match)
                profile_similarity = float(
                    cosine_similarity(
                        [user_profile_embedding],
                        [job_profile_embedding]
                    )[0][0]
                )
                
                # Calculate matched and remaining skills
                matched_skills = []
                remaining_skills = []
                skill_matches = []
                
                for job_skill in required_skills:
                    best_similarity = 0.0
                    best_user_skill = None
                    
                    # Find best matching user skill for this job skill
                    for user_skill in user_skills_raw:
                        user_emb = self.encode_text(user_skill)
                        job_emb = self.skill_embeddings_cache.get(
                            job_skill,
                            self.encode_text(job_skill)
                        )
                        
                        similarity = float(util.pytorch_cos_sim(user_emb, job_emb).item())
                        
                        if similarity > best_similarity:
                            best_similarity = similarity
                            best_user_skill = user_skill
                    
                    # Threshold: >0.6 similarity = matched
                    if best_similarity > 0.6:
                        matched_skills.append(job_skill)
                        skill_matches.append({
                            'job_skill': job_skill,
                            'user_skill': best_user_skill,
                            'similarity': best_similarity
                        })
                    else:
                        remaining_skills.append(job_skill)
                
                # Calculate final confidence
                # Combine: profile similarity (40%) + matched skills ratio (60%)
                matched_ratio = len(matched_skills) / len(required_skills) if required_skills else 0
                confidence = (profile_similarity * 0.4 + matched_ratio * 0.6) * 100
                
                # Weight boost for core skills matched
                core_matched = sum(1 for s in matched_skills if s in core_skills)
                if core_matched > 0:
                    confidence += (core_matched / len(core_skills)) * 15  # +15% bonus for core skills
                
                confidence = min(confidence, 100)  # Cap at 100%
                
                matches.append({
                    'title': job.get('title'),
                    'department': dept,
                    'salary': job.get('salary'),
                    'companies': job.get('companies', []),
                    'jd': job.get('jd'),
                    'confidence': round(confidence, 1),
                    'matchedSkills': matched_skills,
                    'remainingSkills': remaining_skills,
                    'skillMatches': skill_matches,
                    'profileSimilarity': round(profile_similarity * 100, 1),
                    'learningResources': job.get('learningResources', {})
                })
        
        # Sort by confidence
        matches.sort(key=lambda x: x['confidence'], reverse=True)
        
        return {
            'success': True,
            'userSkills': user_skills_raw,
            'userProfileEmbeddingDim': len(user_profile_embedding),
            'totalMatches': len(matches),
            'topMatch': matches[0] if matches else None,
            'matches': matches[:15]  # Top 15
        }

# Initialize matcher
matcher = AISkillMatcher(model)

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'AI Skill Matcher',
        'model': 'all-MiniLM-L6-v2',
        'version': '1.0'
    })

@app.route('/api/ai-match', methods=['POST'])
def ai_match_skills():
    """
    AI-powered skill matching endpoint
    Expects JSON: {
        "skills": "Python, Machine Learning, Data Analysis",
        "department": "all" or specific dept
    }
    """
    try:
        data = request.json
        skills = data.get('skills', '').strip()
        department = data.get('department', 'all')
        
        if not skills:
            return jsonify({'error': 'Please provide skills'}), 400
        
        logger.info(f"Matching skills: {skills} | Department: {department}")
        
        # AI matching
        result = matcher.match_user_to_jobs(skills, department)
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error in AI matching: {str(e)}")
        return jsonify({
            'error': 'Error processing skill match',
            'details': str(e)
        }), 500

@app.route('/api/available-skills', methods=['GET'])
def get_available_skills():
    """Get all available job skills"""
    try:
        all_skills = set()
        for dept_jobs in SKILL_DATA.values():
            for job in dept_jobs:
                if 'requiredSkills' in job:
                    all_skills.update(job['requiredSkills'])
        
        return jsonify({
            'success': True,
            'availableSkills': sorted(list(all_skills))
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/skill-embedding', methods=['POST'])
def get_skill_embedding():
    """Get semantic embedding for a specific skill"""
    try:
        data = request.json
        skill = data.get('skill', '').strip()
        
        if not skill:
            return jsonify({'error': 'Please provide a skill'}), 400
        
        embedding = matcher.encode_text(skill).cpu().numpy().tolist()
        
        return jsonify({
            'success': True,
            'skill': skill,
            'embedding': embedding,
            'embeddingDim': len(embedding)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/similarity', methods=['POST'])
def calculate_similarity():
    """Calculate semantic similarity between two texts"""
    try:
        data = request.json
        text1 = data.get('text1', '').strip()
        text2 = data.get('text2', '').strip()
        
        if not text1 or not text2:
            return jsonify({'error': 'Please provide both texts'}), 400
        
        emb1 = matcher.encode_text(text1)
        emb2 = matcher.encode_text(text2)
        similarity = float(util.pytorch_cos_sim(emb1, emb2).item())
        
        return jsonify({
            'success': True,
            'text1': text1,
            'text2': text2,
            'similarity': similarity,
            'similarityPercentage': round(similarity * 100, 1)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5001))
    logger.info(f"Starting AI Skill Matcher on port {port}...")
    app.run(debug=False, host='0.0.0.0', port=port)
