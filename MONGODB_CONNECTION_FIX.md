# MongoDB Connection Fix Guide for Render Deployment

**Issue:** `Operation 'users.findOne()' buffering timed out after 10000ms`

This means your backend on Render cannot connect to MongoDB Atlas.

---

## Step 1: Check Render Environment Variables

1. Go to: https://dashboard.render.com
2. Select your service: `my-node-backend`
3. Go to **Settings** → **Environment**
4. Verify these variables are set:

```
MONGO_URI=mongodb+srv://vyshnavivsa07_db_user:9863126@nextstepgo.bqaa42c.mongodb.net/?appName=nextstepgo
PORT=5000
AI_SERVICE_URL=http://localhost:5001
JWT_SECRET=your_secure_secret_key
NODE_ENV=production
```

**If MONGO_URI is missing or different, add/update it now.**

---

## Step 2: Check MongoDB Atlas IP Whitelist

MongoDB Atlas blocks connections from unknown IPs. You need to add Render's IP.

### Find Render's IP:
1. Go to Render dashboard
2. Open your service logs (Services → my-node-backend → Logs)
3. Look for error messages with connection attempts
4. Or check Render status page for outbound IP ranges

### Add to MongoDB Atlas Whitelist:
1. Go to: https://cloud.mongodb.com
2. Login to your MongoDB account
3. Select your project: **nextstepgo**
4. Go to **Network Access** → **IP Whitelist**
5. Click **+ Add IP Address**
6. Options:
   - **Quick fix:** Add `0.0.0.0/0` (allow all IPs - less secure)
   - **Better:** Add Render's specific outbound IP
   - **Best:** Use MongoDB Atlas Data API instead

### Current Whitelist Status:
- Check if `0.0.0.0/0` is already added
- Or check for specific IPs that might exclude Render

---

## Step 3: Test Connection String

Ensure the connection string is correct:

```
mongodb+srv://vyshnavivsa07_db_user:9863126@nextstepgo.bqaa42c.mongodb.net/?appName=nextstepgo
```

**Verify:**
- Username: `vyshnavivsa07_db_user` ✓
- Password: `9863126` (matches MongoDB user)
- Cluster: `nextstepgo.bqaa42c` (correct)
- Database: `nextstepgo` (in appName)

If any are wrong, go to MongoDB Atlas and update the connection string.

---

## Step 4: Check Database & Collections

Ensure the database and collections exist:

1. Go to: https://cloud.mongodb.com
2. Select **nextstepgo** project
3. Go to **Databases** → **nextstepgo** cluster
4. Check collections:
   - ✅ `users` - Should exist
   - ✅ `userpreferences` - Should exist

If collections are missing, they'll be auto-created on first write.

---

## Step 5: Redeploy Service

After making changes:

1. Go to Render dashboard
2. Select service: `my-node-backend`
3. Click **Manual Deploy**
4. Wait for deployment to complete (check logs)

---

## Step 6: Test Connection

Once redeployed, test by:

1. Go to: https://my-node-backend-6zba.onrender.com/login.html
2. Try logging in with your test account
3. If new user, go to `/signup.html` and create account
4. Check if error still appears

**Expected:** Should authenticate without timeout error

---

## Alternative: Verify Render Service Status

### Check if services are running:
1. Render Dashboard → Services
2. Look for both:
   - **Web Service** (Node.js backend) - Should be "Live"
   - **Worker** (Python AI service) - Should be "Live"

### Check logs for errors:
1. Click on service
2. Go to **Logs** tab
3. Look for:
   - `MongoDB Connected` message ✓
   - `Connection refused` or `ECONNREFUSED` ✗
   - `TIMEOUT` errors ✗

---

## Quick Fixes Ranked by Likelihood

### Most Likely:
1. **IP Whitelist Issue** - Add `0.0.0.0/0` to MongoDB Atlas
2. **Environment variable not set** - Add MONGO_URI to Render
3. **Wrong connection string** - Verify credentials

### Less Likely:
4. Network connectivity between Render and MongoDB
5. MongoDB database down
6. Connection string timeout (usually 30s, not 10s)

---

## Connection String Format Check

Your connection string should look like:
```
mongodb+srv://[username]:[password]@[cluster].mongodb.net/?[options]
```

Current:
```
mongodb+srv://vyshnavivsa07_db_user:9863126@nextstepgo.bqaa42c.mongodb.net/?appName=nextstepgo
```

✓ Format is correct

---

## If Still Not Working

### Debug Commands (Run in Render SSH):
```bash
# Check Node process
ps aux | grep node

# Check MongoDB connectivity
node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('✓ Database Connected');
  process.exit(0);
}).catch(err => {
  console.error('✗ Database Error:', err.message);
  process.exit(1);
});
"

# Check environment
env | grep MONGO
```

### Check Render Logs:
- Any error messages?
- Is the server starting?
- Is it connecting to MongoDB?

---

## Success Indicators

After fix, you should see:
- ✅ Login page loads without error
- ✅ Can create new account (signup works)
- ✅ Can login with account
- ✅ Bookmarks can be saved
- ✅ Skill matcher results can be bookmarked

---

## Timeline

| Action | Time |
|--------|------|
| Add IP to MongoDB | 1-2 min |
| Update Render env vars | Immediate |
| Redeploy on Render | 3-5 min |
| Database connection | Should be instant |
| **Total Expected Fix Time** | **5-10 minutes** |

---

**Note:** Do NOT commit .env file to Git. Keep credentials secure. Use Render's environment variables instead.
