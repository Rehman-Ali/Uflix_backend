const User = require('../../db/models/Users');
exports.ADD_DEMAND_MOVIE = (req, res, next) => {
    const { email, title1, title2, title3, review } = req.body
    const demandedArr = []
    const demandedMovieObj = {
        title1,
        title2,
        title3,
        review
    }
    demandedArr.push(demandedMovieObj)
    User.findOneAndUpdate({ email }, {
        $set: {
            onDemandMovies: [...onDemandMovies, demandedArr]
        }
    })
        .exec()
        .then(result => {
            res.status(200).json({ success: true, message: 'Your Movie demand registered successfully : ', result, })
        })
        .catch(err => console.log('Complaint registration error :', err))
}