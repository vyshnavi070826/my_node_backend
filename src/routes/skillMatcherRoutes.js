const express = require('express');
const router = express.Router();
const skillMatcherController = require('../controllers/skillMatcherController');

// Match user skills to available jobs
router.post('/match', skillMatcherController.matchSkillsToJobs);

// Get all available skills for autocomplete
router.get('/available-skills', skillMatcherController.getAvailableSkills);

// Get learning resources for a specific skill
router.get('/learning-resources/:skill', skillMatcherController.getLearningResources);

module.exports = router;
