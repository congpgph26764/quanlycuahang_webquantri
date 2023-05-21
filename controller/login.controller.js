const db = require('../models/model');

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
        let objU = new db.userModel();
        objU.name = req.body.username;
        objU.password = req.body.passwd;
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
            let objU = await db.userModel.findOne({email: req.body.email});
            console.log(objU);

            if(objU){
                
                
                    if(objU.password == req.body.passwd){
                        if ((objU.role).toLowerCase() == "admin") {
                            req.session.userLogin = objU;

                            return res.redirect('/');
                        }
                        else{
                            msg = 'Không có quyền đăng nhập';
                        }
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
