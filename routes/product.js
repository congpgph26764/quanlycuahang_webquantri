var express = require('express');
var router = express.Router();
var productcontroller =require('../controller/product.controller');
var check_login = require('../middleware/check_login');
// upload file:
var multer = require('multer'); // dùng upload file
var uploader =  multer({dest: './tmp'});

router.get('/product', check_login.yeu_cau_dang_nhap, productcontroller.getList);
router.post('/product', check_login.yeu_cau_dang_nhap, productcontroller.getList);

router.get('/product/detailpro/:idpro', check_login.yeu_cau_dang_nhap, productcontroller.getDetail);
router.post('/product/detailpro/:idpro', check_login.yeu_cau_dang_nhap, productcontroller.getDetail);

router.get('/add-pro', check_login.yeu_cau_dang_nhap, productcontroller.addProduct);
router.post('/add-pro',uploader.single('image'), check_login.yeu_cau_dang_nhap, productcontroller.addProduct);

router.get('/product/update/:idpro',check_login.yeu_cau_dang_nhap,productcontroller.editProduct);
router.post('/product/update/:idpro',uploader.single('image'),check_login.yeu_cau_dang_nhap,productcontroller.editProduct);

router.get('/product/delete/:idpro',check_login.yeu_cau_dang_nhap,productcontroller.deleteproduct);

router.get('/product/sortproname',check_login.yeu_cau_dang_nhap,productcontroller.sortproname);

router.get('/details/:idsp',check_login.yeu_cau_dang_nhap,productcontroller.getDetailProduct);

module.exports = router;