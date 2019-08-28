const express = require("express");
const router = express.Router();
const adminControllers = require('../../controllers/admin/admin-auth/admin');
const staffAuthControllers = require('../../controllers/staff/staff-auth/staff-auth');
const staffCrudControllers = require('../../controllers/admin/staff-crud/staff-crud');
const userCrudControllers = require('../../controllers/admin/users-crud/user-crud')
//admin auth
router.post('/register', adminControllers.REGISTER_ADMIN);
router.post('/login', adminControllers.LOGIN_ADMIN);
//staff auth
router.post('/staff/register', staffAuthControllers.REGISTER_STAFF)
//staff crud
router.patch('/staff/:staffId', staffCrudControllers.UPDATE_STAFF)
router.delete('/staff/:staffId', staffCrudControllers.REMOVE_STAFF)
//user crud
router.delete('/users/:userId', userCrudControllers.REMOVE_USER);
router.patch('/users/:userId', userCrudControllers.UPDATE_USER);
module.exports = router