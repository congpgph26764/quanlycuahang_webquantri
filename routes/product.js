var express = require('express');
var router = express.Router();
var productcontroller =require('../controller/product.controller');
var check_login = require('../middleware/check_login');
// upload file:
var multer = require('multer'); // dùng upload file
var uploader =  multer({dest: './tmp'});

router.get('/', check_login.yeu_cau_dang_nhap, productcontroller.getHome);

router.get('/product', check_login.yeu_cau_dang_nhap, productcontroller.getList);
router.post('/product', check_login.yeu_cau_dang_nhap, productcontroller.getList);

router.get('/detailpro/:idpro', check_login.yeu_cau_dang_nhap, productcontroller.getDetail);
router.post('/detailpro/:idpro', check_login.yeu_cau_dang_nhap, productcontroller.getDetail);

router.get('/add-pro', check_login.yeu_cau_dang_nhap, productcontroller.addProduct);
router.post('/add-pro', check_login.yeu_cau_dang_nhap, productcontroller.addProduct);

router.get('/edit-pro/:idpro', check_login.yeu_cau_dang_nhap, productcontroller.editProduct);
router.post('/edit-pro/:idpro', check_login.yeu_cau_dang_nhap, productcontroller.editProduct);

router.get('/remove-pro/:idpro',check_login.yeu_cau_dang_nhap, productcontroller.deleteProduct);

module.exports = router;