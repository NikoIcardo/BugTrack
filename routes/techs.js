const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route   POST api/logs
// @desc    Enter a New Log
// @access  Public

router.post('/', (req, res) => {
  console.log('You made it!');
  res.json({message: 'You Made It!'});
});

module.exports = router;
