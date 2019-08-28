const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require('../db/models/Admin');
const keys = require("../config/keys");
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

exports.REGISTER_ADMIN = (req, res, next) => {
    const { errors, isValid } = validateRegisterInput(req.body)
    if (!isValid) {
       return res.status(400).json(errors)
    }
    Admin.findOne({ email: req.body.email })
        .exec()
        .then(admin => {
            if (admin) {
               return res.status(409).json({ email: 'Email already exists' })
            }
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
               return bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                      return res.status(500).json({ Error: err })
                    } else {
                        const newAdmin = new Admin({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        })
                        newAdmin.save()
                            .then(user => {
                                console.log('New User: ', user)
                                res.status(201).json({ success: true, message: 'Admin created successfully', data: user })
                            })
                    }
                })
            })
        })
}

exports.LOGIN_ADMIN = (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body)
    if (!isValid) {
        res.status(400).json(errors)
    }
    const email = req.body.email
    const password = req.body.password
    Admin.findOne({ email }).exec()
        .then(admin => {
            if (!admin) {
               return res.status(404).json({ emailNotFound: 'Email not found' })
            }
            bcrypt.compare(password, admin.password).then(isMatch => {
                if (isMatch) {
                    //jwt_payload
                    const payload = {
                        id: admin.id,
                        name: admin.name
                    }
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
                        if (err) throw err;
                       return res.status(200).json({ success: true, message: 'Successfully Logged In', token: "Bearer" + " " + token })
                    })
                } else {
                   return res.status(500).json({ success: false, passwordIncorrect: 'Password incorrect' })
                }
            })
        })
}