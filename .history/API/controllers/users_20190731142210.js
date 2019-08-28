const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../db/models/Users');
const keys = require("../config/keys");
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const validateCard = require('card-validator');

exports.REGISTER_USER = (req, res) => {
    const { name, email, fname, lname, password, cardNumber, cardExpirationDate, cardCVV } = req.body
    const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
        res.status(400).json(errors)
    }
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user) {
               return res.status(409).json({ email: 'Email already exists' })
            }
            const cvvValidate = validateCard.cvv(cardCVV);
            const cardNumValidate = validateCard.number(cardNumber);
            cvvValidate.isValid ? console.log('cvvValidate :True') : console.log('cvvValidate :False')
            cardNumValidate.isValid ? console.log('cardNumValidate :True') : console.log('cardNumValidate :False')
            bcrypt.genSalt(10, (err, salt) => {
                // if (err) throw err;
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                       return res.status(500).json({ Error: err })
                    } else {
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
        .catch(err => console.log('Error during user creation :', err ))
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