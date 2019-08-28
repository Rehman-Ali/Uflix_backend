const express = require("express");
const router = express.Router();
const complaintsController = require('../../controllers/complaints/complaints');
const staffComplaintsController = require('../../controllers/staff/manage-complaints/manage-complaints');

router.post('/complaints/:userId', complaintsController.ADD_COMPLAINT)

module.exports = router