#!/bin/bash
# AI Skill Matcher - Quick Setup Script
# Automates the setup of both Node.js and Python AI service

set -e

echo "================================"
echo "NextStep AI Skill Matcher Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running from project root
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo -e "${BLUE}Step 1: Installing Node.js dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Node.js dependencies installed${NC}"
echo ""

echo -e "${BLUE}Step 2: Checking Python installation...${NC}"
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is not installed. Please install Python 3.8+ first."
    exit 1
fi
echo -e "${GREEN}✓ Python3 found$(python3 --version)${NC}"
echo ""

echo -e "${BLUE}Step 3: Installing Python dependencies...${NC}"
echo "   This may take 5-10 minutes on first run (downloading model)..."
python3 -m pip install --upgrade pip
python3 -m pip install -r ai_service/requirements.txt
echo -e "${GREEN}✓ Python dependencies installed${NC}"
echo ""

echo -e "${BLUE}Step 4: Verifying AI model...${NC}"
python3 -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')" && echo -e "${GREEN}✓ AI model ready${NC}" || echo -e "${YELLOW}⚠ AI model download may take time on first use${NC}"
echo ""

echo -e "${BLUE}Step 5: Checking skill data...${NC}"
if [ -f "src/models/skillData.json" ]; then
    JOBS_COUNT=$(python3 -c "import json; data=json.load(open('src/models/skillData.json')); print(sum(len(jobs) for jobs in data.values()))")
    echo -e "${GREEN}✓ Skill data ready ($JOBS_COUNT jobs found)${NC}"
else
    echo -e "${YELLOW}⚠ skillData.json not found${NC}"
fi
echo ""

echo "================================"
echo -e "${GREEN}Setup Complete!${NC}"
echo "================================"
echo ""
echo "To start developing:"
echo ""
echo "  Terminal 1 (Python AI Service):"
echo "    python3 ai_service/skill_matcher_ai.py"
echo ""
echo "  Terminal 2 (Node.js Backend):"
echo "    npm start"
echo ""
echo "Then visit:"
echo "  http://localhost:5000/frontend/templates/skill-matcher.html"
echo ""
echo "For more information, see AI_SETUP_GUIDE.md"
echo ""
