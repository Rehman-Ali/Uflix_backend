const express = require("express");
const router = express.Router();
const passport = require('passport');
require('../../config/passport')(passport)
const staffAuthControllers = require('../../controllers/staff/staff-auth/staff-auth');

router.post('/admin/staff/register', staffAuthControllers.REGISTER_STAFF)
router.post('/admin/staff/login', staffAuthControllers.LOGIN_STAFF)
router.patch('/admin/staff/:staffId', staffAuthControllers.UPDATE_STAFF)
router.patch('/admin/staff/:staffId', staffAuthControllers.UPDATE_STAFF)

module.exports = router