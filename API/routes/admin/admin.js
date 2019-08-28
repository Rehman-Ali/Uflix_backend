const express = require("express");
const router = express.Router();
const adminControllers = require('../../controllers/admin/admin-auth/admin');
const staffAuthControllers = require('../../controllers/staff/staff-auth/staff-auth');
const staffCrudControllers = require('../../controllers/admin/staff-crud/staff-crud');
const userCrudControllers = require('../../controllers/admin/users-crud/user-crud')
const complaintsDemandsControllers = require('../../controllers/admin/complaints-demands/complaints-demands');
const feedbackControllers = require('../../controllers/admin/feedback/feedback');

//admin auth
router.post('/register', adminControllers.REGISTER_ADMIN);
router.post('/login', adminControllers.LOGIN_ADMIN);
//staff auth
router.post('/staff/register', staffAuthControllers.REGISTER_STAFF)
//staff crud
router.get('/staff/all_staff', staffCrudControllers.GET_ALL_STAFF);
router.patch('/staff/:staffId', staffCrudControllers.UPDATE_STAFF)
router.delete('/staff/:staffId', staffCrudControllers.REMOVE_STAFF)
//user crud
router.get('/users/all_users', userCrudControllers.GET_ALL_USERS);
router.delete('/users/:userId', userCrudControllers.REMOVE_USER);
router.patch('/users/:userId', userCrudControllers.UPDATE_USER);
//complaints & demands
router.get('/complaints', complaintsDemandsControllers.GET_ALL_COMPLAINTS);
router.get('/demands', complaintsDemandsControllers.GET_ALL_DEMANDS);
// Feedbacks
router.get('/feedbacks', feedbackControllers.GET_ALL_FEEDBACK )
router.get('/get_one_feedback/:feedbackId', feedbackControllers.GET_ONE_FEEDBACK);
router.delete('/feedback/:feedbackId', feedbackControllers.REMOVE_FEEDBACK);
router.patch('/feedback/:feedbackId', feedbackControllers.UPDATE_FEEDBACK);
// demands
router.delete('/demand/:demandId', complaintsDemandsControllers.REMOVE_DEMANDS);
router.patch('/demand/:demandId', complaintsDemandsControllers.UPDATE_DEMANDS);



module.exports = router