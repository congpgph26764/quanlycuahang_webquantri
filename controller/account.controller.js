const db = require('../models/model');

exports.Reg = async (req, res, next) =>{
    let msg = '';
    if(req.method == 'POST'){
        console.log(req.body);
        if(req.body.passwd != req.body.passwd2){
            msg = 'Confirm Pass Sai';
            return res.render('login/reg', {msg: msg});
        }

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


exports.getList = async (req,res,next)=>{

    let dieukien = null;

    let msg = req.query.type;
    let msg1 = req.query.column;

    let text = "";
    let column = "";

    if(req.method =='POST'){

        column = req.body.column;
        text = req.body.text;
        
        dieukien = { [column]: text };

        console.log(dieukien);
        
    }
    

    var list = await db.userModel.find( dieukien );

    if (req.query.hasOwnProperty('_sort')) {

        list = list.sort((a, b) => {

            let A = '';
            let B = '';

            if (req.query.column== "id") {
                A = a.id.toLowerCase();
                B = b.id.toLowerCase();
            }
            if (req.query.column== "name") {
                A = a.name.toLowerCase();
                B = b.name.toLowerCase();
            }
            if (req.query.column== "email") {
                A = a.email.toLowerCase();
                B = b.email.toLowerCase();
            }
            if (req.query.column== "phone") {
                A = a.phone.toLowerCase();
                B = b.phone.toLowerCase();
            }
            if (req.query.column== "role") {
                A = a.role.toLowerCase();
                B = b.role.toLowerCase();
            }
            if (req.query.column== "address") {
                A = a.address.toLowerCase();
                B = b.address.toLowerCase();
            }

            if (req.query.type == "1") {
                if (A < B) {
                    return -1;
                }
                if (A > B) {
                    return 1;
                }
            } 
            else if (req.query.type == "-1"){
                if (A < B) {
                    return 1;
                }
                if (A > B) {
                    return -1;
                }
            }

        
            return 0;
        })
    }
    
    res.render( 'account/list', {data: list , msg: msg, msg1:msg1, column:column, text:text} )
}
