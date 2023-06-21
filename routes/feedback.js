var express = require('express');
var router = express.Router();
var feedbackcontroller = require('../controller/feedback.controller');
var check_login = require('../middleware/check_login');

var multer = require('multer'); // dùng upload file
var uploader =  multer({dest: './tmp'});

router.get('/addfeed',check_login.yeu_cau_dang_nhap,feedbackcontroller.addFeed)
router.post('/addfeed',uploader.single('image'),check_login.yeu_cau_dang_nhap,feedbackcontroller.addFeed);
router.get('/feedback',check_login.yeu_cau_dang_nhap,feedbackcontroller.listFeed);
router.get('/feedback/delete/:idfeed',check_login.yeu_cau_dang_nhap,feedbackcontroller.deleteFeed);

router.get('/detail/:idfeed',check_login.yeu_cau_dang_nhap,feedbackcontroller.getDetailFeed);

module.exports = router;