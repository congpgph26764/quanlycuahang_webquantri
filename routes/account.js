var express = require('express');
var router = express.Router();
var accountcontroller =require('../controller/account.controller');
var check_login = require('../middleware/check_login')


router.get('/login', check_login.khong_yc_dang_nhap, accountcontroller.Login);
router.post('/login', check_login.khong_yc_dang_nhap, accountcontroller.Login);

router.get('/reg', check_login.khong_yc_dang_nhap, accountcontroller.Reg);
router.post('/reg', check_login.khong_yc_dang_nhap, accountcontroller.Reg);

router.get('/account', check_login.yeu_cau_dang_nhap, accountcontroller.getList);
router.post('/account', check_login.yeu_cau_dang_nhap, accountcontroller.getList);

module.exports = router;
