const fs = require('fs');
const db = require('../models/model');

exports.getHome = async (req,res,next)=>{
    res.render('index');
}
exports.getList = async (req,res,next)=>{

    // kiểm tra tồn tại tham số
    let dieu_kien = null;

    if(typeof( req.query.price) != 'undefined' )
    {
        let price = req.query.price; 
        dieu_kien = { price: price };
    }

    // var list = await myModel.spModel.find(  dieu_kien   ).sort( { name: 1 });// tìm sp
    // cải tiến lệnh lấy ds: lấy thêm thể loại
    var list = await db.proModel.find(  dieu_kien   )
                    .populate('id_category') // tên cột tham chiếu
                    ;// tìm sp
    console.log(list);
    //hien thi danh sach sanpham
    res.render('product/list', { data: list});
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


