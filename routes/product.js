var express = require('express');
var router = express.Router();
var spcontroller = require("../controller/product.controller");
var multer = require('multer');
var uploader = multer({dest:'.tmp'});

var check_login = require("../middleware/check_login");

router.get('/product/detailproduct',check_login.yeu_cau_dang_nhap,spcontroller.detail);
router.get('/product/manageproduct',check_login.yeu_cau_dang_nhap,spcontroller.manage);

router.get('/add',spcontroller.addPro)
router.post('/add',uploader.single('image'),spcontroller.addPro);
router.get('/edit/:idpro',spcontroller.editPro);
router.post('/edit/:idpro',spcontroller.editPro);
router.get('/delete/:idpro',spcontroller.deletePro);

module.exports = router;