const Feedback = require('../../db/models/Feedback');
const Movie = require('../../db/models/Movies');
exports.ADD_FEEDBACK = (req, res, next) => {
    const { title, review, ratings, } = req.body
    const { _movieId } = req.params
    Movie.findById({ _id: _movieId })
        .then(res => {
            if (!res) {
                return res.status(404).json({ success: false, message: 'Movie not found' })
            }
            const newFeedback = new Feedback({
                _movieId,
                title,
                review,
                ratings
            })
            return newFeedback.save()
        })
        .then(result => {
            res.status(200).json({ success: true, result, message: 'Thanks for your feedback!' })
        })
        .catch(err => {
            res.status(500).json({ Error: err })
        })
}