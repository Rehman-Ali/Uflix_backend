const Complaint = require('../../../db/models/complaints/complaints');
const Demand = require('../../../db/models/on-demand-movies/on-demand-movies');
exports.GET_ALL_COMPLAINTS = (req, res, next) => {
    Complaint.find()
        .exec()
        .then(allComplaints => {
            if (allComplaints.length < 0) {
                return res.status(404).json({ success: false, message: 'Complaints Not Found' })
            }
            res.status(200).json({ success: true, message: 'All Complaints', allComplaints, totalComplaints: allComplaints.length })
        })
        .catch(err => {
            res.status(500).json({ Error: 'Finding all complaints error :', err })
        })
}

exports.GET_ALL_DEMANDS = (req, res, next) => {
    Demand.find()
        .exec()
        .then(allDemands => {
            if (allDemands.length < 0) {
                return res.status(404).json({ success: false, message: 'Demands Not Found' })
            }
            res.status(200).json({ success: true, message: 'All Demands', allDemands, totalDemands: allDemands.length })
        })
        .catch(err => {
            res.status(500).json({ Error: 'Finding all demands error :', err })
        })
}


exports.REMOVE_DEMANDS = (req, res, next) => {
    const { demandId  } = req.params
    Demand.findByIdAndRemove({ _id: demandId })
        .exec()
        .then(demand => {
            if (!demand) {
                return res.status(404).json({ success: false, message: 'Demand not found' })
            }
            return res.status(200).json({ success: true, message: 'Demand Removed successfully', deleteddemand: demand })
        })
        .catch(err => {
            console.log('Error during remove demand:', err)
        })
}

exports.UPDATE_DEMANDS = (req, res, next) => {
    Demand.findByIdAndUpdate({ _id: req.params.demandId })
        .exec()
        .then(demand => {
            if (!demand) {
                return res.status(404).json({ success: false, Error: 'Demand Movie not Found'  })
            }
            demand.title1 = req.body.title1;
            demand.title2 = req.body.title2;
            demand.title3 = req.body.title3;
            return demand.save()
        })
        .then((updatedDemand) => {
            res.status(200).json({
                success: true,
                message: 'Demand updated successfully',
                updatedDemand,
            })
        })
        .catch(err => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate username
                    return res.status(422).send({ succes: false, message: 'custom Mongodb error occur!' });
                }
            }
        })
}