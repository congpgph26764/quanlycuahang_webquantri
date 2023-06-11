const fs = require('fs');
const db = require('../models/model');


exports.getHome = async (req,res,next)=>{
    res.render('index');
}

exports.addCat = async(req,res,next)=>{
    let msg = ''; // ghi câu thông báo
    var url_image = '';

    let listCat = await db.catModel.find();

    if(req.method =='POST'){
        await fs.promises.rename(req.file.path,'./public/uploads/'+req.file.originalname)
        url_image ='/uploads/'+req.file.originalname;
        console.log("upload thành công"+url_image);
        
        let objCat = new db.catModel();
        objCat.name = req.body.name;
        objCat.image = url_image;
        
        try{
            let new_cat = await objCat.save();
            console.log(new_cat);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ error.message;

        }
 
    }
    res.render( 'category/addcategory',{listCat:listCat})
}
exports.listcat = async(req,res,next)=>{
var list=await db.catModel.find();
console.log(list);

res.render('category/category',{list:list})
}

exports.deleteCat = async (req,res,next)=>{
let msg = ''; // chứa câu thông báo
// load dữ liệu cũ để hiển thị
let objCat = await db.catModel.findById(  req.params.idcat  );
console.log( objCat);
    
    try{
         
        // update dữ liệu
        // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
         await db.catModel.findByIdAndDelete({_id:req.params.idcat});
         res.redirect('/category');

        console.log("Đã xóa thành công");
        msg = 'Đã ghi thành công';
    }catch(err){
        console.log(err);
        msg ='Lỗi '+ err.message;

    }


res.render('category/category', 
        {msg:msg})

}
exports.editcat = async (req,res,next)=>{
let msg = ''; // chứa câu thông báo
// load dữ liệu cũ để hiển thị
let objCat = await db.catModel.findById(  req.params.idcat  );
console.log( objCat);
if(req.method =='POST'){

    let objCat = new db.catModel();
    objCat.name = req.body.name;
    objCat._id = req.params.idcat;
    try{
         
        // update dữ liệu
        // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
         await db.catModel.findByIdAndUpdate({_id:req.params.idcat},objCat);
         res.redirect('/category');
        console.log("Đã ghi thành công");
        msg = 'Đã ghi thành công';
     
    }catch(err){
        console.log(err);
        msg ='Lỗi '+ err.message;

    }

}

res.render('category/editcategory', 
        {msg:msg, objCat: objCat})

}
exports.sortcatname = async(req,res,next)=>{
//Hiển thị danh sach san pham

//kiểm tra tồn tại tham số
let dieu_kien =null;
if(typeof(req.query.name)!='undefined'){
    let name =req.query.name;
    dieu_kien={name:name};
}


//var list=await myModel.spModel.find(dieu_kien).sort({name:1});
//cair tieens lay them the loai
var list=await db.catModel.find().sort({name:-1});
console.log(list);

res.render('category/category',{list:list})
}