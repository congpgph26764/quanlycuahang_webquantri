var express = require('express');
var router = express.Router();
var staffcontroller = require("../controller/staff.controller");

var check_login = require("../middleware/check_login");

router.get('/staff/staffmanager',check_login.yeu_cau_dang_nhap,staffcontroller.manage);
router.get('/staff/addstaff',check_login.yeu_cau_dang_nhap, staffcontroller.addstaff);

module.exports = router;