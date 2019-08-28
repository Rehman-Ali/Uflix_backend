const express = require("express");
const router = express.Router();
const staffAuthControllers = require('../../controllers/staff/staff-auth/staff-auth');

router.post('/register', staffAuthControllers.REGISTER_STAFF)
router.post('/login', staffAuthControllers.LOGIN_STAFF)

module.exports = router