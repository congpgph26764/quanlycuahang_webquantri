var express = require('express');
var router = express.Router();
var categorycontroller = require('../controller/category.controller');
var check_login = require('../middleware/check_login');

router.get('/', check_login.yeu_cau_dang_nhap, categorycontroller.getHome);

router.get('/addcat',check_login.yeu_cau_dang_nhap,categorycontroller.addCat)
router.post('/addcat',check_login.yeu_cau_dang_nhap,categorycontroller.addCat);
router.get('/category',check_login.yeu_cau_dang_nhap,categorycontroller.listcat);
router.get('/category/delete/:idcat',check_login.yeu_cau_dang_nhap,categorycontroller.deleteCat);
router.get('/category/update/:idcat',check_login.yeu_cau_dang_nhap,categorycontroller.editcat);
router.post('/category/update/:idcat',check_login.yeu_cau_dang_nhap,categorycontroller.editcat);
router.get('/category/sortcatname',check_login.yeu_cau_dang_nhap,categorycontroller.sortcatname);

module.exports = router;