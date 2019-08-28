const express = require("express");
const router = express.Router();
const searchMovieController = require('../../../controllers/movies/search-movies/search-movies');
router.get('/movies/search', searchMovieController.SEARCH_MOVIES);
router.get('/movies/request', searchMovieController.ON_REQUEST_MOVIES);
module.exports = router