var express = require('express');
var router = express.Router();
var check_login = require('../middleware/check_login');
var homecontroller = require("../controller/home.controller");


router.get('/',check_login.yeu_cau_dang_nhap,homecontroller.gethome);
module.exports = router;
