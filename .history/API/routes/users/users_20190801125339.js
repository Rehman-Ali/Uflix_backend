const express = require("express");
const router = express.Router();
const passport = require('passport');
require('../../config/passport')( passport )
const usersAuthControllers = require('../../controllers/users/users-auth/users');
const userActionsControllers = require('../../controllers/users/users-actions/users-actions');

router.post('/register', usersAuthControllers.REGISTER_USER)

router.post('/login', usersAuthControllers.LOGIN_USER)
router.patch('/:userId', usersAuthControllers.UPDATE_USER)
router.patch('/payments/:userId', userActionsControllers.CANCEL_PAYMENTS)

module.exports =  router