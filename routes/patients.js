const express = require('express');
const router = express.Router();
const passport = require('passport');

const patientApi = require('../controllers/patient_api');

// pateint routes
router.post('/register', passport.authenticate('jwt', { session: false }), patientApi.create);
router.get('/:id/all_reports', passport.authenticate('jwt', { session: false }), patientApi.getReport);

module.exports = router;
