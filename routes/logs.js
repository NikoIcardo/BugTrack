const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Log = require('../models/Log');

// @route   GET api/logs
// @desc    get logs
// @access  Public

router.get('/', async (req, res) => {
  try {
    const logs = await Log.find({}).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/logs
// @desc    Post a new log
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
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route   PUT api/logs
// @desc    Update a log
// @access  Public

router.put('/:id', async (req, res) => {
  const { message, attention, tech } = req.body;

  const logFields = {};
  if (message) logFields.message = message;
  if (attention) logFields.message = attention;
  if (tech) logFields.message = tech;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found.' });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      {
        $set: logFields,
      },
      { new: true }
    );

    res.status(200).json(log);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// @route   DELETE api/logs
// @desc    get logs
// @access  Public

router.delete('/:id', async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    log.remove();

    res.json({ msg: 'Removed Log.' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
