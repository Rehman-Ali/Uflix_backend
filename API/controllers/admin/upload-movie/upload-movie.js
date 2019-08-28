const Movie = require('../../../db/models/Movies');
exports.UPLOAD_MOVIE = (req, res, next) => {
    // var date = new Date().getDate();
    // var month = new Date().getMonth();
    // var year = new Date().getFullYear();
    console.log('Files :', req.files)
    const { title, description, language, genre, cast } = req.body
    const newMovie = new Movie({
        title,
        description,
        language,
        genre,
        cast,
        image: req.files[0].path,
        video: req.files[1].path,
        // createdAt: date + '/' + month + '/' + year
    })
    newMovie.save()
        .then(result => {
            res.status(200).json({ success: true, message: 'Movie uploaded successfully', result })
        })
        .catch(err => {
            console.log('Movie upload error :', err)
        })
}

exports.UPDATE_MOVIE = (req, res, next) => {
    const { id } = req.params
    const { title, description, language, genre, cast } = req.body
    Movie.findById({ _id: id })
        .exec()
        .then(movie => {
            if (!movie) {
                return res.status(404).json({ success: false, message: 'Movie not found' })
            }
            movie.title = title;
            movie.description = description;
            movie.language = language;
            movie.genre = genre;
            movie.cast = cast;
            movie.image = req.files[0].path;
            movie.video = req.files[1].path;
            return movie.save()
        })
        .then((updatedMovie) => {
            res.status(200).json({ success: true, updatedMovie, message: 'Movie Updated successfully' })
        })
        .catch(err => {
            console.log('Error during movie update :', err)
        })
}

exports.DELETE_MOVIE = (req, res, next) => {
    const { id } = req.params
    Movie.findByIdAndRemove({ _id: id })
        .exec()
        .then(movie => {
            if (!movie) {
                return res.status(404).json({ success: false, message: 'Movie not found' })
            }
            res.status(200).json({ success: true, message: 'Movie deleted successfully', deletedMovie: movie })
        })
        .catch(err => {
            console.log('Error during movie delete :', err)
        })
}