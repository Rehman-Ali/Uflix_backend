const express = require("express");
const router = express.Router();
const passport = require('passport');
require('../../config/passport')( passport )
const usersControllers = require('../../controllers/users-auth/users')

router.post('/register', usersControllers.REGISTER_USER)

router.post('/login', usersControllers.LOGIN_USER)
router.patch('/:userId', usersControllers.UPDATE_USER)

router.post('/auth/facebook/callback', passport.authenticate('facebook', (err, user) => {
    if(err) {
       return console.log('Backend Error ', err)
    }
    else {
        return console.log('Backend User:', user)
    }
}))

module.exports =  router