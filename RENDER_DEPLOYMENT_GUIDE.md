# Render Deployment Guide - AI Skill Matcher

## 🚀 How AI is Enabled After Hosting on Render

### Architecture on Render

```
┌──────────────────────────────────────────────────────────────────┐
│                        Render Platform                           │
│                                                                  │
│  ┌─────────────────────┐         ┌──────────────────────────┐   │
│  │   Web Service       │         │  Background Worker       │   │
│  │  (npm start)        │◄────────┤  (Python AI Service)     │   │
│  │  Port: 5000         │         │  Port: 5001              │   │
│  │  - Express server   │         │  - Flask AI service      │   │
│  │  - Proxy to AI      │         │  - ML embeddings         │   │
│  │  - Static files     │         │  - Confidence scoring    │   │
│  │  - MongoDB client   │         │                          │   │
│  └─────────────────────┘         └──────────────────────────┘   │
│           ▲                                                      │
│           │                                                      │
│     Browser traffic                                              │
│     (User accesses skill matcher)                               │
└──────────────────────────────────────────────────────────────────┘
           ▲
           │
    User's Browser
    (on Internet)
```

### Two-Process Model

**1. Web Service (Primary)**
- Runs: `npm start`
- Listens on: Port 5000 (external)
- Handles: User requests, frontend static files, MongoDB operations
- Proxy function: Forwards `/api/skill-matcher/match` to Python service on port 5001

**2. Worker Service (Background)**
- Runs: `python ai_service/skill_matcher_ai.py`
- Listens on: Port 5001 (internal only, not public)
- Handles: AI inference, semantic embeddings, confidence scoring
- No direct internet access (internal service only)

### How It Works Step-by-Step

```
1. User Input (Browser)
   │
   └─► POST /api/skill-matcher/match
       Skills: "Python, Machine Learning"
       │
   2. Node.js Express Server (Port 5000)
       ├─ Receives request
       ├─ Validates input
       └─ Calls Python service internally: http://localhost:5001/api/ai-match
            │
        3. Python AI Service (Port 5001 - Internal)
            ├─ Receives skills JSON
            ├─ Loads pre-trained model
            ├─ Encodes skills to embeddings
            ├─ Calculates cosine similarity
            ├─ Generates confidence scores
            └─ Returns results JSON
            │
       4. Node.js Processes Response
            ├─ Gets JSON from Python
            ├─ Adds metadata
            └─ Returns to browser
            │
   5. User Sees Results
       ├─ Job matches with confidence %
       ├─ Matched skills ✓
       ├─ Remaining skills
       └─ Learning resource links
```

## 📋 Render Configuration Steps

### Step 1: Create Procfile (✅ Already done)

File: `Procfile` (in project root)
```
web: npm start
worker: python ai_service/skill_matcher_ai.py
```

This tells Render:
- `web`: Main service (HTTP endpoint, public)
- `worker`: Background service (no HTTP endpoint, internal)

### Step 2: Set Build Command in Render Dashboard

**Build Command:**
```bash
npm install && pip install -r ai_service/requirements.txt
```

This installs:
- Node packages (Express, Axios, MongoDB, etc.)
- Python packages (Sentence Transformers, PyTorch, Flask, etc.)

**Start Command:**
- Leave blank (Render uses Procfile automatically)

### Step 3: Environment Variables in Render Dashboard

Add these to Render project settings:

| Variable | Value | Purpose |
|----------|-------|---------|
| `NODE_ENV` | `production` | Node optimization |
| `MONGO_URI` | `mongodb+srv://...` | MongoDB Atlas connection |
| `JWT_SECRET` | `your-secret-key` | Authentication |
| `FLASK_PORT` | `5001` | Python service port |
| `AI_SERVICE_URL` | `http://localhost:5001` | Internal communication |
| `PORT` | `5000` | Web service port |

### Step 4: Deploy to Render

```bash
# From local machine
git add Procfile .env.example
git commit -m "deploy: add Render configuration for AI services"
git push origin main

# Render auto-deploys on push
# Watch deployment logs in Render dashboard
```

## 🔄 Communication Flow on Render

### Local Development (for testing)
```
Terminal 1: python ai_service/skill_matcher_ai.py
  └─ Python service starts on http://localhost:5001

Terminal 2: npm start
  └─ Node service starts on http://localhost:5000
  └─ Can reach Python at http://localhost:5001

Browser: http://localhost:5000/frontend/templates/skill-matcher.html
  └─ Works perfectly with both services running
```

### On Render Production
```
Render automatically starts both:

1. Web Process (HTTP endpoint: https://your-app.onrender.com)
   ├─ Internal name: web-1 (public)
   ├─ Port: 5000
   └─ Can reach worker at: http://localhost:5001

2. Worker Process (No HTTP endpoint: internal only)
   ├─ Internal name: worker-1 (private)
   ├─ Port: 5001
   └─ Only reachable from web process via localhost:5001

Both processes share:
- Same file system
- Same environment variables
- Same build output (Python packages installed)
```

## 🛡️ Fallback Mechanism

If Python service is slow or crashes:

```javascript
// In skillMatcherController.js
try {
    // Try AI service for 30 seconds
    const aiResponse = await axios.post(
        'http://localhost:5001/api/ai-match',
        { skills, department },
        { timeout: 30000 }
    );
    return res.json({ method: 'ai-semantic', ...aiResponse.data });
} catch (error) {
    // Automatically fallback to basic matching
    console.warn('AI service unavailable, using basic matching');
    return matchSkillsToJobsBasic(req, res);
}
```

**Result**: ✅ System **always works**, even if AI is slow
- AI available → Fast semantic matching (100-200ms)
- AI unavailable → Basic string matching (still gives results)
- AI improving → Results automatically improve with no code changes

## 📊 Performance on Render

| Metric | Value | Notes |
|--------|-------|-------|
| First Request | ~5-10s | Model initialization |
| Subsequent Requests | 100-200ms | Pre-computed embeddings |
| Timeout | 30s | Fallback if AI slow |
| Model Size | ~500MB | Downloaded once during build |
| Memory | ~2GB | Render plan should have minimum 2GB |

## ⚠️ Important Notes

1. **Render Plan**: Recommend "Standard" or higher (2GB+ RAM)
   - Free tier may timeout during model download
   - Python service needs ~500MB for model

2. **First Deployment**: Will take longer (downloading ML model)
   - Subsequent deploys: faster (cache reused)

3. **Port Communication**: Uses `localhost:5001` internally
   - This is **not** exposed to the internet
   - Only Node.js process can reach Python service
   - Users cannot directly call Python APIs

4. **Environment Variables**:
   ```
   FLASK_PORT=5001      # Python listens here
   AI_SERVICE_URL=http://localhost:5001  # Node calls here
   ```

## 🧪 Testing After Deployment

### Check Both Services Running

```bash
# SSH into Render container or check logs

# Web service running:
curl https://your-app.onrender.com/health
# Should return 200 OK

# AI service running (internal test):
# Check logs: worker process should show model loaded
```

### Test Skill Matching

```bash
curl -X POST https://your-app.onrender.com/api/skill-matcher/match \
  -H "Content-Type: application/json" \
  -d '{"skills": "Python, Machine Learning", "department": "all"}'

# Should return:
# - method: "ai-semantic" (if AI working) or "basic-string-match" (if fallback)
# - Matches with confidence scores
# - Learning resources
```

### Check Logs

Render Dashboard → Logs:
- **Web service logs**: Shows Node.js startup, requests
- **Worker service logs**: Shows Python startup, ML model loading, AI requests

## 🔄 Updating After Deployment

To update either service:

```bash
# Update Python AI service
# Edit ai_service/skill_matcher_ai.py

# Update Node.js backend
# Edit src/controllers/skillMatcherController.js

# Commit and push
git add .
git commit -m "update: improve AI matching algorithm"
git push origin main

# Render automatically redeploys
# Both web and worker services restart
# New changes take effect immediately
```

## 📈 Monitoring on Render

Watch these in Render Dashboard:

1. **CPU Usage**: Should be low when idle, spikes during requests
2. **Memory**: ~500MB for model + ~200MB overhead = ~700MB normal
3. **Disk**: ~1GB used (Python packages + model)
4. **Network**: O(requests) - should be minimal

If any service crashes, Render auto-restarts it.

## 🎯 Summary

✅ **Two processes run simultaneously on Render**:
- Web (Node.js) = Public HTTP endpoint
- Worker (Python) = Internal AI service

✅ **Communication is internal** (localhost:5001):
- Node calls Python automatically
- Users only interact with Node (port 5000)

✅ **Automatic fallback**:
- AI works → semantic matching
- AI slow/down → basic matching
- No user-facing errors

✅ **Zero config needed**:
- Procfile handles process management
- Environment variables set in Render dashboard
- Auto-scaling and monitoring built-in

**Result**: 🚀 Fully functional AI skill matcher on production with automatic failover!
