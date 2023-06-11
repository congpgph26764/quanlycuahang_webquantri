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

exports.Logout = (req, res, next)=>{
    if(req.session != null )
     req.session.destroy(  function(){
        console.log("Đăng xuất thành công")
        res.redirect('/');
    });
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

exports.addAccount = async (req,res,next)=>{
   
    let msg = ''; // chứa câu thông báo
    var list = await db.userModel.find();
    if(req.method =='POST'){
        
        // tạo đối tượng model 
        let objAccount = new db.userModel();
        objAccount.name = req.body.name;
        objAccount.password = req.body.password;
        objAccount.email = req.body.email;
        objAccount.phone = req.body.phone;
        objAccount.address = req.body.address;
        objAccount.role = req.body.role;
        
        try{
            let new_acc = await objAccount.save();
            
            console.log(new_acc);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 
    }

    res.render('account/add',{msg:msg,data:list});
}
exports.editAccount = async (req,res,next)=>{
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let objAccount = await db.userModel.findById(  req.params.idacc  );
    console.log( objAccount);

    // lấy danh sách thể loại đưa lên form
    let list = await db.userModel.find();

    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        // tạo đối tượng model 

        let objAccount = new db.userModel();
        objAccount.name = req.body.name;
        objAccount.password = req.body.password;
        objAccount.email = req.body.email;
        objAccount.phone = req.body.phone;
        objAccount.address = req.body.address;
        objAccount.role = req.body.role;
        objAccount._id = req.params.idacc;
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await db.userModel.findByIdAndUpdate({_id: req.params.idacc},objAccount);

            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 
    }

    res.render('account/edit', 
            {msg:msg, objAccount: objAccount,data:list})

}
exports.deleteAccount = async (req,res,next)=>{

    let deleteAccount = await db.userModel.deleteOne({_id: req.params.idacc}).exec();

    if(deleteAccount){
        console.log("xoa thanh cong");
        res.redirect('/account');
    }else{
        console.log("xoá null");
        res.redirect('/account');
    }
}

exports.sortaccname = async(req,res,next)=>{
    //Hiển thị danh sach san pham
    
    //kiểm tra tồn tại tham số
    let dieu_kien =null;
    if(typeof(req.query.name)!='undefined'){
        let name =req.query.name;
        dieu_kien={name:name};
    }
    
    
    //var list=await myModel.spModel.find(dieu_kien).sort({name:1});
    //cair tieens lay them the loai
    var list=await db.userModel.find().sort({name:-1});
    console.log(list);
    
    res.render('account/list',{data:list})
    }
