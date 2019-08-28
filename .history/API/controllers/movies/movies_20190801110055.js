const axios = require('axios');
const Movie = require('../../db/models/Movies');

exports.GET_ALL_MOVIES = (req, res, next) => {
    const moviesObj = { id: '', title: '', body: '' }
    const url = 'https://jsonplaceholder.typicode.com/posts'
    axios.get(url)
        .then(response => {
            response.data.map(m => {
                const { id, title, body } = m
                moviesObj.id = id,
                    moviesObj.title = title,
                    moviesObj.body = body
            })
            const newMovie = new Movie(moviesObj)
            newMovie.save()
                .then(movie => {
                    res.status(200).json({ success: true, data: movie, message: 'Movie Saved Successfully' })
                })
                .catch(err => {
                    if (err) {
                        if (err.name === 'MongoError' && err.code === 11000) {
                            // Duplicate username
                            return res.status(422).send({ succes: false, message: 'Record is already exist' });
                        }
                    }
                })
        })
        .catch(err => console.log(err))
}    