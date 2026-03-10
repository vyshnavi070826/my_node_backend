# AI Skill Matcher Service

This is a Python-based machine learning microservice for semantic skill matching and job recommendations.

## Features

- **Semantic Understanding**: Uses HuggingFace's `all-MiniLM-L6-v2` model to understand skills at semantic level
- **Confidence Scoring**: Calculates match confidence (0-100%) based on:
  - Profile-level similarity (40% weight)
  - Matched skills ratio (60% weight)
  - Core skills matching bonus (+15%)
- **Learning Resources**: Returns relevant NPTEL and Coursera links for missing skills
- **Cross-Origin Support**: CORS enabled for Node.js backend communication

## Architecture

```
User Frontend (Browser)
        ↓
   Node.js Express Backend (Port 5000)
        ↓
   Python Flask Service (Port 5001)
        ↓
   AI Skill Matcher with Embeddings
```

## Setup & Installation

### 1. Install Python Dependencies

```bash
cd ai_service
pip install -r requirements.txt
```

**Note**: First-time installation downloads ~500MB (the semantic embedding model). This is normal.

### 2. Verify Data File Exists

The service expects `src/models/skillData.json` in the project root:
```
my_node_backend/
├── ai_service/
│   ├── skill_matcher_ai.py
│   └── requirements.txt
├── src/
│   └── models/
│       └── skillData.json     ← Must exist here
```

## Running the Service

### Local Development

```bash
# From project root
python ai_service/skill_matcher_ai.py

# Or explicitly set port
FLASK_PORT=5001 python ai_service/skill_matcher_ai.py
```

**Output should show:**
```
 * Loading semantic embedding model...
 * ✓ Model loaded successfully
 * Loading skill data from: /path/to/skillData.json
 * ✓ Loaded 15 jobs across 5 departments
 * Starting AI Skill Matcher on port 5001...
```

### Health Check

```bash
curl http://localhost:5001/health
```

Response:
```json
{
  "status": "healthy",
  "service": "AI Skill Matcher",
  "model": "all-MiniLM-L6-v2",
  "version": "1.0"
}
```

## API Endpoints

### 1. Main Matching Endpoint

**POST** `/api/ai-match`

Request:
```json
{
  "skills": "Python, Machine Learning, Data Analysis",
  "department": "all"
}
```

Response:
```json
{
  "success": true,
  "userSkills": ["Python", "Machine Learning", "Data Analysis"],
  "userProfileEmbeddingDim": 384,
  "totalMatches": 15,
  "topMatch": {
    "title": "Data Scientist",
    "confidence": 85.5,
    "matchedSkills": ["Python", "Machine Learning"],
    "remainingSkills": ["SQL", "Data Visualization"],
    "learningResources": {
      "SQL": [{"name": "SQL Fundamentals", "url": "...", "provider": "NPTEL"}]
    }
  },
  "matches": [...]
}
```

### 2. Available Skills

**GET** `/api/available-skills`

Returns all available job skills across all departments:
```json
{
  "success": true,
  "availableSkills": ["Analysis", "ASPEN Plus", "Antibody Design", ...]
}
```

### 3. Skill Embeddings

**POST** `/api/skill-embedding`

Request:
```json
{
  "skill": "Python"
}
```

Response:
```json
{
  "success": true,
  "skill": "Python",
  "embedding": [0.123, -0.456, ...],
  "embeddingDim": 384
}
```

### 4. Similarity Calculation

**POST** `/api/similarity`

Request:
```json
{
  "text1": "Python programming",
  "text2": "Write Python code"
}
```

Response:
```json
{
  "success": true,
  "text1": "Python programming",
  "text2": "Write Python code",
  "similarity": 0.89,
  "similarityPercentage": 89.0
}
```

## Integration with Node.js Backend

The Node.js Express backend should proxy requests:

```javascript
// In skillMatcherController.js

const axios = require('axios');

exports.matchSkills = async (req, res) => {
  try {
    const { skills, department } = req.body;
    
    // Call Python AI service
    const response = await axios.post(
      'http://localhost:5001/api/ai-match',
      { skills, department },
      { timeout: 30000 }
    );
    
    res.json(response.data);
  } catch (error) {
    // Fallback or error handling
    res.status(500).json({ error: error.message });
  }
};
```

## ML Model Details

- **Model**: `all-MiniLM-L6-v2`
- **Dimensions**: 384
- **Parameters**: 22M
- **Training**: Pre-trained on 1B+ sentence pairs
- **Speed**: ~50ms per 10 skills
- **Accuracy**: ~90% for related skill matching

## Environment Variables

```
FLASK_PORT=5001          # Port to run the service (default: 5001)
```

## Performance Notes

- **First Run**: ~5-10 seconds (model download + initialization)
- **Subsequent Runs**: <100ms startup
- **Per Request**: ~100-200ms for 15+ job matches

## Troubleshooting

### Import Error: `sentence_transformers not found`

Solution:
```bash
pip install sentence-transformers torch scikit-learn
```

### Path Error: `skillData.json not found`

Solution:
- Ensure `src/models/skillData.json` exists
- Run Python script from project root, not from ai_service/

### Port Already in Use

Solution:
```bash
# Use different port
FLASK_PORT=5002 python ai_service/skill_matcher_ai.py
```

### Model Download Issues

Solution:
```bash
# Download model separately first
python -c "from sentence_transformers import SentenceTransformer; \
SentenceTransformer('all-MiniLM-L6-v2')"
```

## Future Enhancements

- [ ] Add skill difficulty levels
- [ ] Cache embeddings in Redis
- [ ] Support for skill hierarchies
- [ ] Personalized learning paths
- [ ] Integration with LinkedIn profiles
- [ ] Real-time skill demand tracking

## License

Same as main NextStep project
