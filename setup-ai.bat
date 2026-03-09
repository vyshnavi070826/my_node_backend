@echo off
REM AI Skill Matcher - Quick Setup Script (Windows)
REM Automates the setup of both Node.js and Python AI service

setlocal enabledelayedexpansion

echo.
echo ================================
echo NextStep AI Skill Matcher Setup
echo ================================
echo.

REM Check if running from project root
if not exist "package.json" (
    echo Error: Please run this script from the project root directory
    exit /b 1
)

echo Step 1: Installing Node.js dependencies...
call npm install
echo. 
echo ^[OK^] Node.js dependencies installed
echo.

echo Step 2: Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed. Please install Python 3.8+ first.
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo ^[OK^] %PYTHON_VERSION% found
echo.

echo Step 3: Installing Python dependencies...
echo    This may take 5-10 minutes on first run (downloading model)...
python -m pip install --upgrade pip
python -m pip install -r ai_service\requirements.txt
echo.
echo ^[OK^] Python dependencies installed
echo.

echo Step 4: Verifying AI model...
python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')" >nul 2>&1
if errorlevel 1 (
    echo Warning: AI model download may take time on first use
) else (
    echo ^[OK^] AI model ready
)
echo.

echo Step 5: Checking skill data...
if exist "src\models\skillData.json" (
    for /f %%i in ('python -c "import json; data=json.load(open('src/models/skillData.json')); print(sum(len(jobs) for jobs in data.values()))"') do set JOBS_COUNT=%%i
    echo ^[OK^] Skill data ready (!JOBS_COUNT! jobs found)
) else (
    echo Warning: skillData.json not found
)
echo.

echo ================================
echo Setup Complete!
echo ================================
echo.
echo To start developing:
echo.
echo   Terminal 1 (Python AI Service^):
echo     python ai_service\skill_matcher_ai.py
echo.
echo   Terminal 2 (Node.js Backend^):
echo     npm start
echo.
echo Then visit:
echo   http://localhost:5000/frontend/templates/skill-matcher.html
echo.
echo For more information, see AI_SETUP_GUIDE.md
echo.

pause
