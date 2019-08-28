const Movie = require('../../db/models/Movies');

exports.GET_ALL_MOVIES = (req, res, next) => {
    Movie.find()
        .exec()
        .then(movies => {
            if (!movies) {
                return res.status(404).json({ success: false, message: 'Movies not found' })
            }
            res.status(200).json({ success: true, movies, })
        })
        .catch(err => {
            console.log('Getting all movies error :', err)
        })
}