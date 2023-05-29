var express = require('express');
var router = express.Router();
var usercontroller =require('../controller/users.controller');
var check_login = require('../middleware/check_login')

/* GET users listing. */

router.get('/login', check_login.khong_yc_dang_nhap, usercontroller.list);

router.get('/reg', check_login.khong_yc_dang_nhap, usercontroller.addUser);
router.post('/reg', check_login.khong_yc_dang_nhap, usercontroller.addUser);


router.get('/',check_login.khong_yc_dang_nhap,usercontroller.list);

router.get('/add',check_login.khong_yc_dang_nhap,usercontroller.addUser)
router.post('/add',check_login.khong_yc_dang_nhap,usercontroller.addUser);

router.get('/edit/:iduser',check_login.khong_yc_dang_nhap,usercontroller.editUser);
router.post('/edit/:iduser',check_login.khong_yc_dang_nhap,usercontroller.editUser);

router.get('/delete/:iduser',check_login.khong_yc_dang_nhap,usercontroller.deleteUser);

module.exports = router;
