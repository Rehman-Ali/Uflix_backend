const express = require("express");
const router = express.Router();
const feedbackController = require('../../controllers/Feedback/feedback')
router.post('/add_feedback/:_movieId', feedbackController.ADD_FEEDBACK);
module.exports = router