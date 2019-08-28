const axios = require('axios');

exports.GET_ALL_MOVIES = (req, res, next) => {
    const movies = []
    const url = 'https://jsonplaceholder.typicode.com/posts'
    axios.get(url)
        .then(response => {
            movies.push(response.data)
            console.log(movies)
        })
        .catch(err => {
            console.log('Not working :', err)
            res.status(500).json({ success: false, Error: err.response.data })
        })
    console.log(movies)
}    