const express = require('express');
const router = express.Router();
const passport = require('passport');

const reportController = require('../controllers/reports_api');

//routes for fectching reports controller
router.get('/:status', passport.authenticate('jwt', { session: false }), reportController.allReportsWithStatus);
router.post('/:id/create_report', passport.authenticate('jwt', { session: false }), reportController.createReport);

module.exports = router;