const express = require("express");
const router = express.Router();
const passport = require('passport');
require('../../config/passport')(passport)
const staffAuthControllers = require('../../controllers/staff/staff-auth/staff-auth');

router.post('/staff/register', staffAuthControllers.REGISTER_STAFF)

router.post('/staff/login', staffAuthControllers.LOGIN_STAFF)

module.exports = router