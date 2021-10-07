const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Tech = require('../models/Tech');

// @route   GET api/techs
// @desc    Get techs
// @access  Public

router.get('/', async (req, res) => {
  try {
    const techs = await Tech.find({});

    if (techs.length === 0) {
      return res.json({ msg: 'There are currently no techs registered.' });
    }

    res.json(techs);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/techs
// @desc    Enter a New tech
// @access  Public

router.post(
  '/',
  [
    check('firstName', 'Please add a first name.').not().isEmpty(),
    check('lastName', 'Please add a last name.').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json(errors);
    }

    try {
      let tech = new Tech(req.body);

      await tech.save();

      res.status(200).json({ msg: 'Tech Added.' });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/techs
// @desc    Delete tech
// @access  Public

router.delete('/:id', async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);

    tech.remove();

    res.json({ msg: 'Removed tech.' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
