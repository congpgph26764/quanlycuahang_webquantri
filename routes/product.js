var express = require('express');
var router = express.Router();
var productcontroller =require('../controller/product.controller');
var check_login = require('../middleware/check_login')

router.get('/', check_login.yeu_cau_dang_nhap, productcontroller.getHome);

module.exports = router;