const User = require('../../../db/models/Users');
const validateUpdateInput = require('../../../validation/users/update-profile');
exports.GET_ALL_USERS = (req, res, next) => {
    User.find()
        .then(users => {
            if (!users) {
                return res.status(404).json({ succes: false, message: 'User not found' })
            }
            return res.status(200).json({ succes: true, users, userTotals: users.length })
        })
        .catch(err => {
            res.status(500).json({ Error: 'Error during getting all users :', err })
        })
}
exports.REMOVE_USER = (req, res, next) => {
    const { userId } = req.params
    User.findByIdAndRemove({ _id: userId })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' })
            }
            return res.statu(200).json({ success: true, message: 'User Removed successfully' })
        })
        .catch(err => {
            console.log('Error during remove user action :', err)
        })
}

exports.UPDATE_USER = (req, res, next) => {
    console.log('frontend body*/*/*/*/ :', req.body)
    const { errors, isValid } = validateUpdateInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
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
