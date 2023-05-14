var express = require('express');
var router = express.Router();
var invoicecontroller = require("../controller/invoice.controller");

var check_login = require("../middleware/check_login");

router.get('/invoice/manageinvoice',check_login.yeu_cau_dang_nhap,invoicecontroller.manage);

module.exports = router;