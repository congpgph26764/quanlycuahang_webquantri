const db = require('../models/users.model');

exports.Reg = async (req, res, next) =>{
    let msg = '';
    if(req.method == 'POST'){
        console.log(req.body);
        if(req.body.passwd != req.body.passwd2){
            msg = 'Confirm Pass Sai';
            return res.render('login/reg', {msg: msg});
        }

        // Kiem tra hop le cac phan khac neu co ...

        // Xu li csdl
        let objU = new db.usersModel();
        objU.username = req.body.username;
        objU.passwd = req.body.passwd;
        objU.email = req.body.email;
        objU.role = req.body.role;

        try{
            await objU.save();
            console.log("Đăng kí thành công");
            msg = 'Đăng kí thành công';
        }catch(error){
            msg = 'Lỗi' + error.message;
        }

    }

    res.render('login/reg', {msg: msg});
}

exports.Login = async (req, res, next) =>{
    let msg = '';
    if(req.method == 'POST'){
        console.log(req.body);
        

        try {
            let objU = await db.usersModel.findOne({username: req.body.username});
            console.log(objU);
            //Lay duoc thong tin tai khoan ===> Kiem tra pass
            if(objU != null){
                if(objU.passwd == req.body.passwd){
                    req.session.userLogin = objU;

                    // Tu chuyen trang chu hoc trang nao do

                    return res.redirect('/');
                }else{
                    msg = 'Sai Password';
                }
            }else{
                msg = 'Tài khoản không tồn tại';
            }
        } catch (error) {
            msg = 'Lỗi' + error.message;
        }
    }


    res.render('login/login', {msg: msg});
}
