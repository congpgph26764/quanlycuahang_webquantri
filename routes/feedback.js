var express = require('express');
var router = express.Router();
var feedbackcontroller = require('../controller/feedback.controller');
var check_login = require('../middleware/check_login');

router.get('/', check_login.yeu_cau_dang_nhap, feedbackcontroller.getHome);

var multer = require('multer'); // dùng upload file
var uploader =  multer({dest: './tmp'});

router.get('/addfeed',check_login.yeu_cau_dang_nhap,feedbackcontroller.addFeed)
router.post('/addfeed',uploader.single('img'),check_login.yeu_cau_dang_nhap,feedbackcontroller.addFeed);
router.get('/feedback',check_login.yeu_cau_dang_nhap,feedbackcontroller.listFeed);
router.get('/feedback/delete/:idfeed',check_login.yeu_cau_dang_nhap,feedbackcontroller.deleteFeed);

module.exports = router;