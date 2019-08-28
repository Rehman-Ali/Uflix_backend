const express = require("express");
const router = express.Router();
const passport = require('passport');
require('../../config/passport')(passport)
const adminControllers = require('../../controllers/admin/admin')

router.post('/register', adminControllers.REGISTER_ADMIN)
router.post('/login', adminControllers.LOGIN_ADMIN)

module.exports = router