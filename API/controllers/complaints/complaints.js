const User = require('../../db/models/Users');
const Complaint = require('../../db/models/complaints/complaints')
exports.ADD_COMPLAINT = (req, res, next) => {
    const { subject, complaint } = req.body
    const { userId } = req.params
    User.findById({ _id: userId })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' })
            }
            const newComplaint = new Complaint({
                _userId: userId,
                subject,
                complaint
            })
            return newComplaint.save()
        })
        .then(result => {
            res.status(200).json({ success: true, message: 'Complaint registered successfully : ', result, })
        })
        .catch(err => {
            res.status(500).json({ Error: 'Complaint registration error :', err })
        })
}