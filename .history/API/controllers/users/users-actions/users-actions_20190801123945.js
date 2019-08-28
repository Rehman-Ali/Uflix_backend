const User = require('../../../db/models/Users');
exports.CANCEL_PAYMENTS = (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.params.userId }, { $set: { willPay: false } })
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({ success: false, message: 'User not found' })
            }
            return res.status(201).json({ success: true, message: 'Payment cancelled successfully' })
        })
        .catch(err => {
            console.log('Error during payment cancel action :', err)
        })
}