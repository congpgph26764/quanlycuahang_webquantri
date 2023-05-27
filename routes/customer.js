var express = require('express');
var router = express.Router();
var customercontroller = require("../controller/customer.controller");

var check_login = require("../middleware/check_login");

router.get('/customer/customermanager',check_login.yeu_cau_dang_nhap,customercontroller.manage);
router.get('/customer/feedback',check_login.yeu_cau_dang_nhap, customercontroller.feedback);

module.exports = router;