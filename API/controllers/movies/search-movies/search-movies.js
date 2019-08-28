const Movies = require('../../../db/models/Movies');
exports.SEARCH_MOVIES = (req, res, next) => {
    const { title } = req.body
    Movies.findOne({ title })
        .exec()
        .then(mov => {
            if (!mov) {
                return res.status(404).json({ success: false, message: 'Movie not found' })
            }
            return res.status(200).json({ success: true, message: 'Movie found', mov })
        })
        .catch(err => {
            res.status(500).json({ Error: err })
        })
}

exports.ON_REQUEST_MOVIES = (req, res, next) => {
    const { language } = req.body
    Movies.find({ language, })
        .exec()
        .then(mov => {
            if (!mov) {
                return res.status(404).json({ success: false, message: 'Movie not found' })
            }
            res.status(200).json({ success: true, message: 'Movies found', mov })
        })
        .catch(err => {
            res.status(500).json({ success: false, Error: err })
        })
}