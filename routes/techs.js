const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Tech = require('../models/Tech');



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
    if (!error.isEmpty()) {
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

module.exports = router;
