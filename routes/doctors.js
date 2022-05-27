const express = require('express');
const router = express.Router();
const passport = require('passport');

const doctorApi = require('../controllers/doctor_api');

// Create doctor routes
router.post('/register', doctorApi.register);
router.post('/login', doctorApi.createSession);

module.exports = router;