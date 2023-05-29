const fs = require('fs');
const myModel = require('../models/model');
exports.detail = async (req,res,next)=>{
    res.render('product/detailproduct');
}
exports.manage = async (req,res,next)=>{
    // hiển thị danh sách sản phẩm

    // chức năng lọc: 
    // kiểm tra tồn tại tham số
    let dieu_kien = null;

    if(typeof( req.query.price) != 'undefined' )
    {
        let price = req.query.price; 
        dieu_kien = { price: price };
    }

    // var list = await myModel.spModel.find(  dieu_kien   ).sort( { name: 1 });// tìm sp
    // cải tiến lệnh lấy ds: lấy thêm thể loại
    var list = await myModel.proModel.find(  dieu_kien   )
                    .populate('id_category') // tên cột tham chiếu
                    ;// tìm sp
    console.log(list);
    //hien thi danh sach sanpham
    res.render('product/manageproduct', { listSp: list });
}
// exports.addPro = async (req, res, next)=>{
//     let msg = ''; // ghi câu thông báo
//     var url_img='';

//     if(req.method =='POST'){


//         await fs.promises.rename(req.file.path,'./public/uploads/'+req.file.originalname)
//         url_img='/uploads/'+req.file.originalname;
//         console.log("upload thành công"+url_img);

//         let objPro = new myModel.proModel();
//         objPro.name = req.body.name;
//         objPro.price=req.body.price;
//         objPro.quantity=req.body.quantity;
//         objPro.description=req.body.description;
//         objPro.image = url_img;
        
//         try{
//             let new_pro = await objPro.save();
            
//             console.log(new_pro);

//             console.log("Đã ghi thành công");
//             msg = 'Đã thêm thành công';
//         }catch(err){
//             console.log(err);
//             msg ='Lỗi '+ err.message;

//         }
 
//     }

//     res.render('product/addproduct', {msg:msg});
// }
// exports.editPro = async (req,res,next)=>{
//     let msg = ''; // chứa câu thông báo

//     let objPro = await myModel.proModel.findById(  req.params.idpro  );
//     console.log( "aa");
//     console.log( objPro);
//     if(req.method =='POST'){

        
//         let objPro = new myModel.proModel();
//         objPro.name = req.body.name;
//         objPro.price=req.body.price;
//         objPro.quantity=req.body.quantity;
//         objPro.description=req.body.description;
//         objNote._id     = req.params.idpro;
//         try{
             

//              await myModel.proModel.findByIdAndUpdate({_id:req.params.idpro},objPro);
//             res.redirect('/product');
//             console.log("Đã ghi thành công");
//             msg = 'Đã ghi thành công';
//         }catch(err){
//             console.log(err);
//             msg ='Lỗi '+ err.message;

//         }
 
//     }

//     res.render('product/editproduct', 
//             {msg:msg, objPro: objPro})

// }
// exports.deletePro = async (req,res,next)=>{
//     let msg = ''; // chứa câu thông báo

//     let objPro = await myModel.proModel.findById(  req.params.idpro  );
//     console.log( objPro);
        
//         try{
             

//              await myModel.proModel.findByIdAndDelete({_id:req.params.idpro});
//              res.redirect('/product');

//             console.log("Đã xóa thành công");
//             msg = 'Đã ghi thành công';
//         }catch(err){
//             console.log(err);
//             msg ='Lỗi '+ err.message;

//         }
 

//     res.render('product/manageproduct', 
//             {msg:msg})

// }