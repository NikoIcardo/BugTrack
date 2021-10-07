const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Log = require('../models/Log');

// @route   get api/logs
// @desc    get logs
// @access  Public

router.get('/', async (req, res) => {
  try {
    const logs = await Log.find({}).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   post api/logs
// @desc    get logs
// @access  Public

router.post(
  '/',
  [
    check('message', 'Please enter a message.').not().isEmpty(),
    check('attention', 'Please specify if this log needs attention or not.')
      .not()
      .isEmpty(),
    check('tech', 'Please enter a tech.').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      let log = new Log(req.body);

      console.log(log);

      await log.save();

      res.status(201).json({ message: 'Log Added.' });
    } catch (error) {
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
