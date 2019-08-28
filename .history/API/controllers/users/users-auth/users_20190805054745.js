const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../../../db/models/Users');
const keys = require("../../../config/keys");
const validateRegisterInput = require('../../../validation/users/register');
const validateLoginInput = require('../../../validation/users/login');
const validateUpdateInput = require('../../../validation/users/update-profile');

exports.REGISTER_USER = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
        res.status(400).json(errors)
    }
    User.findOne({ $or: [{ email: req.body.email }, { cardNumber: req.body.cardNumber }] })
        .exec()
        .then(user => {
            if (user) {
                return res.status(409).json({ email: 'Email Or Card Number already exists' })
            }
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ Error: err })
                    } else {
                        const { name, email, fname, lname, cardNumber, cardExpirationDate, cardCVV } = req.body
                        const newUser = new User({
                            name,
                            email,
                            password: hash,
                            confPassword: hash,
                            fname,
                            lname,
                            cardNumber,
                            cardExpirationDate,
                            cardCVV
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
        .catch(err => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate username
                    return res.status(422).send({ succes: false, message: 'User with this profile data is already exist!' });
                }
            }
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
               return res.status(404).json({ emailNotFound: 'Email not found' })
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
                       return res.status(200).json({ success: true, message: 'Successfully Logged In', token: "Bearer" + " " + token, currentUser: user })
                    })
                } else {
                   return res.status(500).json({ success: false, passwordIncorrect: 'Password incorrect' })
                }
            })
        })
}

exports.UPDATE_USER = (req, res, next) => {
    const { errors, isValid } = validateUpdateInput(req.body)
    if (!isValid) {
        res.status(400).json(errors)
    }
    User.findByIdAndUpdate({ _id: req.params.userId }, {
        $set: {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            cardNumber: req.body.cardNumber,
            cardExpirationDate: req.body.cardExpirationDate,
            cardCVV: req.body.cardCVV
        }
    })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({ success: false, Error: 'User not found' })
            }
            return res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
            })
        })
        .catch(err => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate username
                    return res.status(422).send({ succes: false, message: 'User with this profile data is already exist!' });
                }
            }
        })
}
