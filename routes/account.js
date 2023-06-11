var express = require('express');
var router = express.Router();
var accountcontroller =require('../controller/account.controller');
var check_login = require('../middleware/check_login');
const { get } = require('mongoose');


router.get('/login', check_login.khong_yc_dang_nhap, accountcontroller.Login);
router.post('/login', check_login.khong_yc_dang_nhap, accountcontroller.Login);

// router.get('/logout',accountcontroller.Login);


router.get('/reg', check_login.khong_yc_dang_nhap, accountcontroller.Reg);
router.post('/reg', check_login.khong_yc_dang_nhap, accountcontroller.Reg);

router.get('/account', check_login.yeu_cau_dang_nhap, accountcontroller.getList);
router.post('/account', check_login.yeu_cau_dang_nhap, accountcontroller.getList);

router.get('/logout', check_login.yeu_cau_dang_nhap, accountcontroller.Logout);

router.get('/add', check_login.yeu_cau_dang_nhap, accountcontroller.addAccount);
router.post('/add', check_login.yeu_cau_dang_nhap, accountcontroller.addAccount);

router.get('/account/update/:idacc',check_login.yeu_cau_dang_nhap,accountcontroller.editAccount);
router.post('/account/update/:idacc',check_login.yeu_cau_dang_nhap,accountcontroller.editAccount);

router.get('/remove/:idacc',check_login.yeu_cau_dang_nhap, accountcontroller.deleteAccount);

router.get('/account/sortaccname',check_login.yeu_cau_dang_nhap,accountcontroller.sortaccname);

module.exports = router;
