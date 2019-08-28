const validateRegisterInput = require('../../../validation/staff/register');
const validateLoginInput = require('../../../validation/staff/login');
const bcrypt = require('bcryptjs');
const Staff = require('../../../db/models/Staff');
exports.REGISTER_STAFF = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
        res.status(400).json(errors)
    }
    Staff.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user) {
                return res.status(409).json({ email: 'Email already exists' })
            }
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ Error: err })
                    } else {
                        const { email, fname, lname, } = req.body
                        const newUser = new User({
                            fname,
                            lname,
                            email,
                            password: hash,
                            confPassword: hash,
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

exports.LOGIN_STAFF = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)
    if (!isValid) {
        res.status(400).json(errors)
    }
    const email = req.body.email
    const password = req.body.password
    Staff.findOne({ email }).exec()
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