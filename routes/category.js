var express = require('express');
var router = express.Router();
var categorycontroller = require('../controller/category.controller');
var check_login = require('../middleware/check_login');

var multer = require('multer'); // dùng upload file
var uploader =  multer({dest: './tmp'});

router.get('/addcat',check_login.yeu_cau_dang_nhap,categorycontroller.addCat)
router.post('/addcat',uploader.single('image'),check_login.yeu_cau_dang_nhap,categorycontroller.addCat);
router.get('/category',check_login.yeu_cau_dang_nhap,categorycontroller.listcat);
router.get('/category/delete/:idcat',check_login.yeu_cau_dang_nhap,categorycontroller.deleteCat);
router.get('/category/update/:idcat',check_login.yeu_cau_dang_nhap,categorycontroller.editcat);
router.post('/category/update/:idcat',uploader.single('image'),check_login.yeu_cau_dang_nhap,categorycontroller.editcat);

module.exports = router;