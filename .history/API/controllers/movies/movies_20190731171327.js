const axios = require('axios');

exports.GET_ALL_MOVIES = (req, res, next) => {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    axios.get(url)
            .then(response => {
                res.status(200).json({ success: true, data: response.data })
            })
            .catch(err => {
                console.log('Not working :', err)
               res.status(500).json({ success: false, Error: err.response.data })
            })
}    