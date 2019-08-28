const express = require("express");
const router = express.Router();
const demandedMoviesController = require('../../../controllers/movies/onDemandMovies/onDemandMovies');

router.post('/onDemand/:userId', demandedMoviesController.ADD_DEMAND)
router.get('/onDemand/:demandId', demandedMoviesController.GET_DEMAND)

module.exports = router