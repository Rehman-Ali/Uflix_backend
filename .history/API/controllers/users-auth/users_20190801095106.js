const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../../db/models/Users');
const keys = require("../../config/keys");
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

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
        .catch(err => console.log('Error during user creation :', err))
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

exports.UPDATE_USER = (req, res, next) => {
    Product.findByIdAndUpdate({ email: req.body.email }, {
        $set: {
            fname: req.body.name,
            lname: req.body.name,
            email: req.body.email,
            cardNumber: req.body.cardNumber,
            cardExpirationDate: req.body.cardExpirationDate,
            cardCVV: req.file.cardCVV
        }
    })
        .exec()
        .then(user => {
            if (!user) {
                res.status(404).json({ success: false, Error: 'Product not found for this id' })
            }
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                body: {
                    method: 'PATCH',
                    URL: `http://localhost:5000/${user._id}`,
                    data: user
                }
            })
        })
        .catch(err => {
            console.log('Updating User Error: ', err)
        })
}
