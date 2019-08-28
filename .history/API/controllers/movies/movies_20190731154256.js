const axios = require('axios');

exports.GET_ALL_MOVIES = (req, res, next) => {
    const url = 'https://jsonplaceholder.typicode.com/posts'
async () => {
    axios.get(url)
            .then(response => {
               await res.status(200).json({ success: true, data: response.data })
            })
            .catch(err => {
                console.log('Not working :', err)
               await res.status(500).json({ success: false, Error: err.response.data })
            })
}    
}