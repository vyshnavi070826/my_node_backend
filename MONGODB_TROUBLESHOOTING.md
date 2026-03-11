# MongoDB Connection Troubleshooting Checklist

## Current Connection String
```
mongodb+srv://vyshnavivsa07_db_user:9863126@nextstepgo.bqaa42c.mongodb.net/?appName=nextstepgo
```

## Parse the Connection String
- **Scheme:** mongodb+srv:// ✓
- **Username:** vyshnavivsa07_db_user ✓
- **Password:** 9863126 ✓
- **Host:** nextstepgo.bqaa42c.mongodb.net ✓
- **Database:** nextstepgo (via appName) ✓

## DNS Resolution Error
`querySrv ECONNREFUSED _mongodb._tcp.nextstepgo.bqaa42c.mongodb.net`

This means it's trying to resolve the SRV DNS record and failing.

## What to Verify:

1. **Cluster Name** - Is "nextstepgo" your actual cluster name?
   - Go to MongoDB Atlas → Deployment → Clusters
   - What is the exact cluster name?

2. **Connection String** - Is this the exact string from MongoDB?
   - Don't manually type it - copy from Atlas
   - Settings → Connection String → Standard Connection

3. **Username & Password**
   - Username: vyshnavivsa07_db_user ✓
   - Password: 9863126 - Does this match your database user password?

4. **Network**
   - IP Whitelist: Does it include 0.0.0.0/0 or Render's IP?
   - Firewall: Any restrictions on port 27017?

## Questions for You:

1. When you created the MongoDB user, what was the exact username and password?
2. When you copied the connection string from MongoDB Atlas, what did it say?
3. Has this connection ever worked (even locally)?
4. What happens if you change the password in MongoDB and use the new one?

## Possible Fixes:

### Option 1: Get Fresh Connection String from MongoDB
1. Go to MongoDB Atlas → Clusters → Connect
2. Click "Drivers" → Node.js
3. Copy the connection string exactly (don't modify it)
4. Replace MONGO_URI in .env with the copied string
5. Update Render environment variable
6. Redeploy

### Option 2: Verify User Credentials
1. Go to MongoDB Atlas → Database Access → Users
2. Click on your user (vyshnavivsa07_db_user)
3. Note the exact username
4. Reset password and note the new password
5. Update connection string if password changed

### Option 3: Test Connection with MongoDB Shell
If you have MongoDB tools installed:
```bash
mongosh "mongodb+srv://vyshnavivsa07_db_user:9863126@nextstepgo.bqaa42c.mongodb.net/nextstepgo"
```

## Render Specific Issue:
The connection might work differently on Render due to:
- Different DNS resolution
- Network policies
- Outbound firewall rules

Try this on Render:
1. Go to Settings → Environment → Edit
2. Add temporary variable: `DEBUG=mongodb:*`
3. Redeploy and check logs
4. Look for more detailed error messages
