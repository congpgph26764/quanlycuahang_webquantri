var express = require('express');
var router = express.Router();
var spcontroller = require("../controller/product.controller");

var check_login = require("../middleware/check_login");

router.get('/product/listproduct',check_login.yeu_cau_dang_nhap,spcontroller.list);
router.get('/product/manageproduct',check_login.yeu_cau_dang_nhap,spcontroller.manage);

module.exports = router;