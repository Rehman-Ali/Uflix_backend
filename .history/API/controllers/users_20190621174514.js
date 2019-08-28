const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../db/models/Users');
const keys = require("../config/keys");
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

exports.REGISTER_USER = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
        res.status(400).json(errors)
    }
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user) {
                res.status(409).json({ email: 'Email already exists' })
            }
            bcrypt.genSalt(10, (err, salt) => {
                // if (err) throw err;
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                        res.status(500).json({ Error: err })
                    } else {
                        const newUser = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        })
                        newUser.save()
                            .then(user => {
                                console.log('New User: ', user)
                                res.status(201).json({ success: true, message: 'User created successfully', data: user })
                            })
                    }
                })
            })
        })
}

exports.LOGIN_USER = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)
    if (!isValid) {
        res.status(400).json(errors)
    }
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email }).exec()
        .then(user => {
            if (!user) {
                res.status(404).json({ emailNotFound: 'Email not found' })
            }
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    //jwt_payload
                    const payload = {
                        id: user.id,
                        name: user.name
                    }
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
                        if (err) throw err;
                        res.status(200).json({ success: true, message: 'Successfully Logged In', token: "Bearer" + " " + token })
                    })
                } else {
                    res.status(500).json({ success: false, passwordIncorrect: 'Password incorrect' })
                }
            })
        })
}