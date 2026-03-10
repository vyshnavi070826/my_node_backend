# Skill Matcher Debug Guide

## Error: "Cannot read properties of undefined (reading 'map')"

This error typically means a `.map()` is being called on an undefined variable. I've added robust error handling, but let's debug together.

## 🔧 How to Test Locally

### Step 1: Start Python AI Service
```bash
# Terminal 1
python ai_service/skill_matcher_ai.py
```

Wait for:
```
✓ Model loaded successfully
✓ Loaded XX jobs across X departments
Starting AI Skill Matcher on port 5001...
 * Running on http://0.0.0.0:5001
```

### Step 2: Start Node Backend
```bash
# Terminal 2
npm start
```

### Step 3: Test in Browser
1. Open: http://localhost:5000/frontend/templates/skill-matcher.html
2. In browser **F12 > Console** (keep open!)
3. Enter text: `I can code in Python, do data analysis`
4. Click "Find Matching Jobs"

## 📊 What You Should See In Console

### Success Flow:
```
Step 1: Extracting skills from text...
Extraction response: {
  success: true,
  method: "skill-extraction",
  skillsList: ["Python", "Data Analysis"],
  skillCount: 2,
  ...
}
✓ Extracted skills: Array(2) ["Python", "Data Analysis"]
Step 2: Matching extracted skills to jobs...
Match response: {
  success: true,
  totalMatches: 5,
  matches: [...]
}
✓ Matching complete
```

### If You See Errors:

**Error Type 1: Extraction endpoint fails**
```
Extraction response: { error: "..." }
```
**Fix**: Check Python service is running on port 5001
```bash
curl http://localhost:5001/health
```

**Error Type 2: Match endpoint fails**
```
Match response: { error: "..." }
```
**Fix**: Check skillData.json is loaded in Python service

**Error Type 3: Undefined response**
```
Extraction response: undefined
```
**Fix**: Python service might be down. Check Terminal 1 logs.

## ✅ Testing Endpoints Directly

### Test Extraction Endpoint
```bash
curl -X POST http://localhost:5001/api/extract-skills \
  -H "Content-Type: application/json" \
  -d '{"text":"I know Python and machine learning"}'
```

**Expected Response:**
```json
{
  "success": true,
  "method": "skill-extraction",
  "originalText": "I know Python and machine learning",
  "extractedSkills": [
    {"skill": "Python", "confidence": 95.2},
    {"skill": "Machine Learning", "confidence": 92.1}
  ],
  "skillsList": ["Python", "Machine Learning"],
  "skillCount": 2
}
```

### Test Match Endpoint
```bash
curl -X POST http://localhost:5000/api/skill-matcher/match \
  -H "Content-Type: application/json" \
  -d '{"skills":"Python, Data Analysis","department":"all"}'
```

**Expected Response:**
```json
{
  "success": true,
  "method": "ai-semantic",
  "totalMatches": 8,
  "matches": [
    {
      "title": "Data Scientist",
      "confidence": 92,
      "matchedSkills": ["Python", "Data Analysis"],
      "remainingSkills": ["SQL"]
    }
  ]
}
```

## 🐛 Common Issues & Fixes

### Issue: "Cannot read properties of undefined (reading 'map')"

**Root Cause**: One of these is undefined:
- `extractionData.skillsList`
- `job.matchedSkills`
- `job.remainingSkills`

**Check List**:
- [ ] Python service running? `curl http://localhost:5001/health`
- [ ] Does `/api/extract-skills` return valid JSON? See curl test above
- [ ] Does `/api/skill-matcher/match` return valid JSON? See curl test above
- [ ] Check browser console for error stack trace

**Browser Console Debugging**:
1. Open DevTools (F12)
2. Go to Console tab
3. Click "Find Matching Jobs"
4. Look for exact error line number
5. Check what `extractionData` contains
6. Check what `matchData` contains

### Issue: "Timeout" or "AI service unavailable"

This is **normal and expected**. The system:
1. Tries AI service (Python) for 30 seconds
2. If timeout, falls back to basic matching
3. You'll see: `"method": "basic-string-match"` instead of `"ai-semantic"`

**Verify**:
- [ ] Python service fully loaded? (Wait for model loading to complete)
- [ ] Is Python consuming model on first request? (5-10 sec on first request)

### Issue: No matches found

**Check**:
- [ ] Did extraction work? (Check console for `skillsList`)
- [ ] Are extracted skills empty? `skillCount: 0`
- [ ] Try simpler text: "Python" instead of long description
- [ ] Verify skillData.json has jobs: Check Python logs or curl health

## 🔍 Detailed Troubleshooting

### Python Service Won't Start
```bash
# Check Python version
python --version  # Should be 3.8+

# Check dependencies
pip list | grep sentence-transformers

# Reinstall if needed
pip install -r ai_service/requirements.txt --force-reinstall
```

### Model Download Issues
```bash
# Try manual download
python -c "from sentence_transformers import SentenceTransformer; \
SentenceTransformer('all-MiniLM-L6-v2'); print('✓ Success')"
```

### Port Already in Use
```powershell
# Find what's using port 5001
Get-NetTCPConnection -LocalPort 5001

# Kill the process
Get-Process -Name "python" | Stop-Process -Force
```

## 📋 Quick Test Checklist

Before reporting issues, verify:

- [ ] Python service running on port 5001
- [ ] Node backend running on port 5000
- [ ] `/api/extract-skills` returns proper JSON
- [ ] `/api/skill-matcher/match` returns proper JSON
- [ ] Browser console shows full response objects
- [ ] No network errors in Network tab (F12 > Network)

## 🎯 Expected Behavior

**Good Response**:
```
TextArea: "I can code in Python"
                    ↓
        [Extracting skills...]
                    ↓
     [AI Extracted Skills: Python]
                    ↓
        [Matching to jobs...]
                    ↓
  Job 1: Data Scientist (85%)
  Job 2: Python Developer (92%)
  Job 3: Backend Engineer (78%)
```

**Alternative (Fallback)**:
Same as above but shows:
```
Method: Basic Text Parsing (instead of AI Semantic Understanding)
```

## 📞 If Still Stuck

1. **Copy browser console** (F12 > Console > right-click > Save as)
2. **Copy Python terminal output** (what does model loading show?)
3. **Copy Node terminal output** (what are the logs showing?)
4. Test extraction and match endpoints separately (curl commands above)

Then we can debug from the actual response data!

---

**Latest Fix**: Added robust handling for undefined arrays + detailed logging to browser console. All errors now safely caught and displayed.
