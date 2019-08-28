const express = require("express");
const router = express.Router();
const staffAuthControllers = require('../../controllers/staff/staff-auth/staff-auth');
const staffComplaintsControllers = require('.././../controllers/staff/manage-complaints/manage-complaints');
//auth
router.post('/register', staffAuthControllers.REGISTER_STAFF);
router.post('/login', staffAuthControllers.LOGIN_STAFF);

//complaints handles
router.get('/complaints/', staffComplaintsControllers.GET_ALL_COMPLAINTS)
router.get('/complaints/:_complaintId', staffComplaintsControllers.GET_COMPLAINT)
// router.patch('/complaints/update', staffComplaintsControllers.MANAGE_STATUS)
router.patch('/complaints/:_complaintId', staffComplaintsControllers.UPDATE_COMPLAIN)
router.delete('/complaints/:_complaintId', staffComplaintsControllers.REMOVE_COMPLAIN)


module.exports = router