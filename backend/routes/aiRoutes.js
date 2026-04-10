const express = require('express');
const router = express.Router();
const { generateGigDescription, generateTags } = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

router.post('/generate-description', authMiddleware, generateGigDescription);
router.post('/generate-tags', authMiddleware, generateTags);

module.exports = router;
