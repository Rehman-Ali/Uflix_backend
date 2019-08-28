const User = require('../../../db/models/Users');
const Demand = require('../../../db/models/on-demand-movies/on-demand-movies');

exports.ADD_DEMAND = (req, res, next) => {
    const { title1, title2, title3, review } = req.body
    const { userId } = req.params
    User.findById({_id: userId})
        .exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' })
            }
            const newDemand = new Demand({
                _userId: userId,
                title1,
                title2,
                title3,
                review
            })
            return newDemand.save()
        })
        .then(result => {
            res.status(200).json({ success: true, message: 'Demanded Movie registered successfully : ', result, })
        })
        .catch(err => {
            res.status(500).json({ Error: 'Demanded Movie registration error :', err })
        })
}
exports.GET_DEMAND = (req, res, next) => {
    const { demandId } = req.params
    Demand.findById({ _id: demandId })
        .select('_userId title1 title2 title3 review')
        .populate('_userId')
        .exec()
        .then(dMovie => {
            if (!dMovie) {
                return res.status(404).json({ success: false, message: 'Demanded Movie not Found' })
            }
            res.status(200).json({ success: true, message: 'Demanded Movie found', dMovie, })
        })
        .catch(err => {
            res.status(500).json({ Error: 'Demanded Movie finding error :', err })
        })
}