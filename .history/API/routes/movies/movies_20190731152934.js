const express = require("express");
const router = express.Router();
const moviesController = require('../../controllers/movies/movies')
router.get('/all_movies', moviesController)
module.exports = router