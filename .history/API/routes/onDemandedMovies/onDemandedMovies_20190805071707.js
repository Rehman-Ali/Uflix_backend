const express = require("express");
const router = express.Router();
const demandedMoviesController = require('../../controllers/onDemandMovies/onDemandMovies')

router.post('/onDemand', demandedMoviesController.ADD_DEMAND_MOVIE)

module.exports = router