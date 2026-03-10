# My Node.js Backend Project

This is a simple Node.js backend application that uses Express and MongoDB. 

## Project Structure

```
my-node-backend
├── src
│   ├── app.js
│   ├── server.js
│   ├── controllers
│   │   └── index.js
│   ├── routes
│   │   └── index.js
│   ├── models
│   │   └── index.js
│   └── middleware
│       └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-node-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB credentials:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   ```

## Usage

To start the server, run:
```
npm start
```

The server will listen on the specified port defined in `src/server.js`.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is licensed under the MIT License.


//////////////////////


Your Input: "I can code in Python, do data analysis, a bit of ML stuff"
    ↓
Frontend calls: POST /api/skill-matcher/extract
    ↓
Node backend tries → Python AI service at localhost:5001
    ↓
Python AI Service (Running on Render Worker Process) receives request
    ↓
Loads the model (all-MiniLM-L6-v2)
    ↓
Encodes your text to 384-dimensional embedding vector
    ↓
Encodes each of the 14 job skills to embeddings
    ↓
Calculates cosine similarity between your text and each skill
    ↓
Returns: {
  method: "skill-extraction",  // ← NOT "basic-extraction"!
  extractedSkills: [
    { skill: "Python", confidence: 95.2 },
    { skill: "Data Analysis", confidence: 92.1 },
    { skill: "Machine Learning", confidence: 88.3 }
  ]
}
    ↓
Frontend shows: "AI Extracted Skills: Python, Data Analysis, Machine Learning"
┌─────────────────────────────────────────────────────┐
│     PRODUCTION-READY AI SKILL MATCHER                │
├─────────────────────────────────────────────────────┤
│                                                       │
│ ✅ Two-process architecture working                  │
│    - Web service (Node.js) on port 5000              │
│    - Worker service (Python AI) on port 5001         │
│                                                       │
│ ✅ AI genuinely processing requests                  │
│    - Loading semantic embeddings                     │
│    - Computing similarity scores                     │
│    - Returning confident matches                     │
│                                                       │
│ ✅ Fallback system in place but STANDBY              │
│    - Only activates if Python crashes                │
│    - Ensures 100% uptime                             │
│                                                       │
│ ✅ Production deployed on Render                     │
│    - Both processes running                          │
│    - Auto-scaling configured                         │
│    - Database connected                              │
│                                                       │
└─────────────────────────────────────────────────────┘