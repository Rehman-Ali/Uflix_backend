const Staff = require('../../../db/models/Staff');
const validateUpdateInput = require('../../../validation/staff/register');
exports.REMOVE_STAFF = (req, res, next) => {
    const { staffId } = req.params
    Staff.findByIdAndRemove({ _id: staffId })
        .exec()
        .then(staff => {
            if (!staff) {
                return res.status(404).json({ success: false, message: 'Staff user not found' })
            }
            return res.status(200).json({ success: true, message: 'Staff user Removed successfully' })
        })
        .catch(err => {
            console.log('Error during remove user action :', err)
        })
}

exports.UPDATE_STAFF = (req, res, next) => {
    const { errors, isValid } = validateUpdateInput(req.body)
    if (!isValid) {
        res.status(400).json(errors)
    }
    Staff.findByIdAndUpdate({ _id: req.params.userId }, {
        $set: {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,

        }
    })
        .exec()
        .then(staff => {
            if (!staff) {
                return res.status(404).json({ success: false, Error: 'Staff User not found' })
            }
            return res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: staff
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
