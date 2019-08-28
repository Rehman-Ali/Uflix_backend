const express = require("express");
const router = express.Router();
const complaintsController = require('../../controllers/complaints/complaints')

router.post('/complaints', complaintsController.ADD_COMPLAINT)

module.exports = router