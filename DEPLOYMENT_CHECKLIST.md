# 🚀 RENDER DEPLOYMENT CHECKLIST

## Pre-Deployment (Do These First) ✅

- [ ] All code changes committed locally
  ```bash
  git add -A
  git commit -m "feat: add AI skill matcher with Render production setup"
  ```

- [ ] All changes pushed to GitHub
  ```bash
  git push origin main
  ```

- [ ] Verify files exist:
  - [ ] `Procfile` (tells Render what to run)
  - [ ] `.env.example` (environment variable template)
  - [ ] `ai_service/skill_matcher_ai.py` (AI service code)
  - [ ] `ai_service/requirements.txt` (Python dependencies)
  - [ ] `src/controllers/skillMatcherController.js` (with axios + fallback)
  - [ ] `src/models/skillData.js` (14 jobs, no errors)

- [ ] No errors in code (verified locally):
  ```bash
  node --check src/models/skillData.js
  node --check src/controllers/skillMatcherController.js
  ```

## Render Setup (Follow These Steps) 🔧

### Step 1: Create Account & Project
- [ ] Go to [render.com](https://render.com)
- [ ] Sign in with GitHub account
- [ ] Click "New +" → "Web Service"
- [ ] Select repository: `my_node_backend`
- [ ] Connect Repository

### Step 2: Configure Build Settings
In Render Dashboard:

- [ ] **Name**: `nextstep-skill-matcher` (or your choice)
- [ ] **Environment**: `Node`
- [ ] **Build Command**:
  ```
  npm install && pip install -r ai_service/requirements.txt
  ```
  *(This installs both Node and Python dependencies)*

- [ ] **Start Command**:
  ```
  npm start
  ```
  *(Procfile handles this automatically, but good to verify)*

- [ ] **Plan**: Free (for testing) or Paid (for production)

### Step 3: Set Environment Variables
Click on "Environment" in Render Dashboard:

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `NODE_ENV` | `production` | Tells Node we're in production |
| `PORT` | `5000` | Web service port (Render assigns this) |
| `FLASK_PORT` | `5001` | Python service port (internal) |
| `MONGO_URI` | `mongodb+srv://username:password@cluster.mongodb.net/dbname` | **Your MongoDB connection string** |
| `JWT_SECRET` | `your-super-secret-key-here-min-32-chars` | **Generate a strong random string** |
| `AI_SERVICE_URL` | `http://localhost:5001` | Internal communication (leave as-is) |

**⚠️ IMPORTANT**: 
- `MONGO_URI`: Copy from your MongoDB Atlas dashboard (replace with real credentials)
- `JWT_SECRET`: Generate a random string, min 32 characters

### Step 4: Deploy!
- [ ] Click "Deploy" button
- [ ] Watch the logs in Render Dashboard

**Logs Timeline** (what you'll see):
```
00:00 Build Started
      npm install
      pip install (may take 5-10 minutes, downloading packages)
      
05:00 Build Complete
      Starting service
      
05:05 Starting Processes:
      web: npm start
      worker: python ai_service/skill_matcher_ai.py
      
05:10 Python Loading Model
      Model loading: "Downloading pytorch model..."
      (First time takes 5-10 minutes)
      
05:20 Services Running
      "Web service running"
      "Worker service running"
      App is LIVE! ✅
```

## Post-Deployment Testing ✅

### Test 1: Check Services Running
```bash
# View your deployed app
https://your-render-url.onrender.com/frontend/templates/hub.html

# Should load without errors
```

### Test 2: Test Skill Matcher API
```bash
curl -X POST https://your-render-url.onrender.com/api/skill-matcher/match \
  -H "Content-Type: application/json" \
  -d '{
    "skills": "Python, Data Analysis",
    "department": "bioinfo"
  }'
```

**Expected Response** (AI working):
```json
{
  "method": "ai-semantic",
  "userSkills": ["Python", "Data Analysis"],
  "matches": [
    {
      "title": "Bioinformatician",
      "confidence": 85,
      "matchedSkills": ["Python", "Data Analysis"],
      "remainingSkills": ["R", "Linux"],
      "learningResources": {
        "R": [{"name": "R for Bioinformatics", "url": "...", "provider": "..."}]
      }
    }
  ]
}
```

**Or Fallback Response** (if AI is slow):
```json
{
  "method": "basic-string-match",
  "userSkills": ["Python", "Data Analysis"],
  "matches": [...]
}
```

Either is OK! Both work. Check `"method"` field to see which one was used.

### Test 3: Check Render Logs
In Render Dashboard → "Logs":
- [ ] No errors shown
- [ ] Both web and worker processes running
- [ ] Model loaded successfully

## Troubleshooting 🔧

### Issue: Build Fails / Error about Python
**Solution:**
```bash
# Ensure requirements.txt exists locally:
ls ai_service/requirements.txt

# Should contain:
# sentence-transformers
# torch
# scikit-learn
# numpy
# flask
# flask-cors
# python-dotenv
```

### Issue: App Crashes at Startup
**Check logs** in Render for:
- [ ] `MONGO_URI` is set and valid
- [ ] `JWT_SECRET` is set
- [ ] Database actually exists
- [ ] Free tier MongoDB has your IP whitelisted (set to 0.0.0.0/0)

### Issue: Skill Matcher Returns Errors
**In Render Logs**, look for AI service errors:
- [ ] Python service started? (should say "Worker service running")
- [ ] Model downloaded? (look for "Model downloaded" in logs)
- [ ] Check if `AI_SERVICE_URL` is correct: `http://localhost:5001`

### Issue: Everything Shows "basic-string-match" Never "ai-semantic"
**This means AI service isn't responding (but that's OK!)**
- [ ] First deploy: Model downloads take 10+ minutes, be patient
- [ ] Check Python logs for errors
- [ ] Upgrade from Free to Paid tier (better resources)
- [ ] Increase timeout if needed

### Issue: Memory Errors or Out of Memory
**Solution**: Upgrade Render plan from Free to Standard ($7/month minimum)
- Free tier: 512MB RAM (too tight for ML model)
- Standard: 2GB RAM (comfortable)

## Quick Commands Reference

```bash
# View status in terminal:
curl https://your-app.onrender.com/health

# Check if skill matcher working:
curl -X POST https://your-app.onrender.com/api/skill-matcher/match \
  -H "Content-Type: application/json" \
  -d '{"skills":"Java","department":"chem-eng"}'

# View live logs:
# Open Render Dashboard → Logs tab (real-time)
```

## Success Checklist ✅

When complete, you should have:
- [ ] Render project created and deployed
- [ ] Both web and worker services running
- [ ] Environment variables all set
- [ ] MongoDB connected successfully
- [ ] Skill matcher API responds (either AI or fallback)
- [ ] Frontend loads without errors
- [ ] Users can input skills and get matches
- [ ] Results show confidence scores and learning paths
- [ ] No crashes or 500 errors in logs

## Performance Notes 📊

**First Request** (after deploy):
- Takes 8-12 seconds (model loading)
- User sees spinner, results arrive

**Subsequent Requests**:
- Takes 100-200ms (very fast)
- AI working smoothly

**If Takes >30 seconds**:
- System automatically falls back to basic matching
- No error shown to user
- Results still delivered (just lower quality)

## Next Steps After Deployment

1. ✅ Test with different skills ("Python", "SQL", "Java", etc.)
2. ✅ Test different departments (bioinfo, biotech, chem-eng, etc.)
3. ✅ Share the URL with beta users
4. ✅ Monitor logs for errors
5. ✅ Celebrate! 🎉

---

**You've Got This! 🚀**

If anything goes wrong, check the Render Logs—they're your best friend for debugging production issues.

Questions? Check the `RENDER_DEPLOYMENT_GUIDE.md` for detailed explanations.
