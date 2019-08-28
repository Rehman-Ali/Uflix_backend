const express = require("express");
const router = express.Router();
const passport = require('passport');
require('../config/passport')( passport )
const usersControllers = require('../controllers/users')

router.post('/register', usersControllers.REGISTER_USER)

router.post('/login', usersControllers.LOGIN_USER)

router.get('/dashboard', (req, res) => {
    res.status(200).json({success: true} )
})

router.post('/auth/facebook/callback', passport.authenticate('facebook', (err, user) => {
    if(err) {
       return console.log('Backend Error ', err)
    }
    else {
        return console.log('Backend User:', user)
    }
}))

module.exports =  router