const Complaint = require('../../../db/models/complaints/complaints');
// const validateUpdateInput = require('../../../validation/users/update-profile');

exports.GET_ALL_COMPLAINTS = (req, res, next) => {
    Complaint.find()
        .exec()
        .then(allComplaints => {
            if (allComplaints.length < 0) {
                return res.status(404).json({ success: false, message: 'Complaints Not Found' })
            }
            res.status(200).json({ success: true, message: 'All Complaints', allComplaints })
        })
        .catch(err => {
            res.status(500).json({ Error: 'Finding all complaints error :', err })
        })
}

exports.GET_COMPLAINT = (req, res, next) => {
    const { _complaintId } = req.params
    Complaint.findById({ _id: _complaintId })
        .select('_userId subject complaint')
        .populate('_userId')
        .exec()
        .then(comp => {
            if (!comp) {
                return res.status(404).json({ success: false, message: 'Complaint not found' })
            }
            res.status(200).json({ success: true, message: 'Complaint found', complaint: comp, })
        })
        .catch(err => {
            res.status(500).json({ Error: 'Complaint finding error :', err })
        })
}

exports.MANAGE_STATUS = async (req, res, next) => {
    
    const { id, status } = req.body
    // console.log(status);
    await Complaint.findByIdAndUpdate({ _id: id })
        .exec()
        .then(uStatus => {
            if (!uStatus) {
                return res.status(404).json({ success: false, message: 'Complaint not found for this Id' })
            }
            uStatus.status = status,
            res.status(200).json({ success: true, message: 'Status Changed successfuly', uStatus })
        })
        .catch(err => {
            res.status(500).json({ Error: err })
        })


}



exports.UPDATE_COMPLAIN = (req, res, next) => {
    // const { errors, isValid } = validateUpdateInput(req.body)
    // if (!isValid) {
    //     return res.status(400).json(errors)
    // }
    Complaint.findByIdAndUpdate({ _id: req.params._complaintId }, {
        $set: {
            status: req.body.status
        }
    })
        .exec()
        .then(status => {
            if (!status) {
                return res.status(404).json({ success: false, Error: 'Status was not updated' })
            }
            return res.status(200).json({
                success: true,
                message: 'Status updated successfully',
            })
        })
        .catch(err => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate username
                    return res.status(422).send({ succes: false, message: 'Update with this profile data is already updated!' });
                }
            }
        })
}


exports.REMOVE_COMPLAIN = (req, res, next) => {
    const { _complaintId } = req.params
    console.log(_complaintId)
    Complaint.findByIdAndRemove({ _id: _complaintId })
        .exec()
        .then(complain => {
            if (!complain) {
                return res.status(404).json({ success: false, message: 'Complain not found' })
            }
            return res.status(200).json({ success: true, message: 'Complian Removed successfully' })
        })
        .catch(err => {
            console.log('Error during remove complain action :', err)
        })
}
