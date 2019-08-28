const User = require('../../db/models/Users');
exports.ADD_COMPLAINT = (req, res, next) => {
    const { email, subject, complaint } = req.body
    const complaintObj = {
        subject,
        complaint
    }
    User.findOneAndUpdate( { email }, {$set: {
        complaints: complaints.push(complaintObj)
    }})
    .exec()
    .then(result => {
        res.status(200).json({success: true, message: 'Complaint registered successfully : ', result,})
    })
    .catch(err => console.log('Complaint registration error :', err) )
}