const fs = require('fs');
const db = require('../models/model');

exports.getHome = async (req,res,next)=>{
    res.render('index');
}
exports.getList = async (req,res,next)=>{

    let dieu_kien = null;

    let msg = req.query.type;
    let msg1 = req.query.column;

    let text = "";
    let column = "";
    
    if(req.method =='POST'){

        column = req.body.column;
        text = req.body.text;
        
        dieu_kien = { [column]: text };

        console.log(dieu_kien);
        
    }
    var list = await db.proModel.find(dieu_kien).populate('id_category');
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
                            if (req.query.column== "price") {
                                A = a.price.toString();
                                B = b.price.toString();
                            }
                            if (req.query.column== "quantity") {
                                A = a.quantity.toString();
                                B = b.quantity.toString();
                            }
                            if (req.query.column== "description") {
                                A = a.description.toLowerCase();
                                B = b.description.toLowerCase();
                            }
                            if (req.query.column== "id_category") {
                                A = a.id_category.toLowerCase();
                                B = b.id_category.toLowerCase();
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
    res.render('product/list', { data: list, msg: msg, msg1:msg1, column:column, text:text});
}

exports.addProduct = async (req,res,next)=>{
   
    let msg = ''; // chứa câu thông báo
    let list = await db.catModel.find();

    if(req.method =='POST'){
        
        // tạo đối tượng model 
        let objSP = new db.proModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.quantity = req.body.quantity;
        objSP.description = req.body.description;
        objSP.id_category = req.body.id_category;
        try{
            let new_pro = await objSP.save();
            
            console.log(new_pro);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
            res.redirect('/product');
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 
    }

    res.render('product/add-pro',{msg:msg,data:list});
}
exports.editProduct = async (req,res,next)=>{
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let objSP = await db.proModel.findById(  req.params.idpro  );
    console.log( objSP);

    // lấy danh sách thể loại đưa lên form
    let list = await db.catModel.find();

    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        // tạo đối tượng model 

        let objSP = new db.proModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.quantity = req.body.quantity;
        objSP.description = req.body.description;
        objSP.id_category = req.body.id_category;
        objSP._id = req.params.idpro;
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await db.proModel.findByIdAndUpdate({_id: req.params.idpro},objSP);

            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 
    }

    res.render('product/edit-pro', 
            {msg:msg, objSP: objSP,data:list})

}
exports.deleteProduct = async (req,res,next)=>{

    let deleteProduct = await db.proModel.deleteOne({_id: req.params.idpro}).exec();

    if(deleteProduct){
        console.log("xoa thanh cong");
        res.redirect('/product');
    }else{
        console.log("xoá null");
        res.redirect('/product');
    }
}
exports.getDetail = async (req,res,next)=>{
    res.render('product/detailpro')

}


