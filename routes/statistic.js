var express = require('express');
var router = express.Router();
var statisticcontroller = require('../controller/statistic.controller');
var check_login = require('../middleware/check_login');

router.get('/', check_login.yeu_cau_dang_nhap, statisticcontroller.getHome);

module.exports = router;