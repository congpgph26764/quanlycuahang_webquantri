const fs = require('fs');
const db = require('../models/model');
const path = require('path');

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
    var url_image = '';
    let image = "";

    let list = await db.catModel.find();

    if(req.method =='POST'){
        await fs.promises.rename(req.file.path, './public/uploads/' + req.file.originalname)
        url_image = '/uploads/' + req.file.originalname;
        console.log("upload thành công" + url_image);

        const imagePath = "./public" + url_image;
        let image = "";

        try {
            const imageBuffer = fs.readFileSync(imagePath);
            const base64Image = imageBuffer.toString('base64');
            const fileExtension = path.extname(imagePath);

            const dataUrl = 'data:image/' + fileExtension + ';base64,' + base64Image;
            image = dataUrl;
        } catch (error) {
            console.error('Lỗi khi chuyển đổi ảnh thành Base64:', error);
        }
        
        // tạo đối tượng model 
        let objSP = new db.proModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.quantity = req.body.quantity;
        objSP.description = req.body.description;
        objSP.image = image;
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
    var url_image = '';
    let image = "";
    // load dữ liệu cũ để hiển thị
    let list = await db.catModel.find();
    let objSP = await db.proModel.findById(  req.params.idpro );
    console.log( objSP);
    if(req.method =='POST'){
        await fs.promises.rename(req.file.path, './public/uploads/' + req.file.originalname)
        url_image = '/uploads/' + req.file.originalname;
        console.log("upload thành công" + url_image);

        const imagePath = "./public" + url_image;
        let image = "";

        try {
            const imageBuffer = fs.readFileSync(imagePath);
            const base64Image = imageBuffer.toString('base64');
            const fileExtension = path.extname(imagePath);

            const dataUrl = 'data:image/' + fileExtension + ';base64,' + base64Image;
            image = dataUrl;
        } catch (error) {
            console.error('Lỗi khi chuyển đổi ảnh thành Base64:', error);
        }


        let objSP = new db.proModel();
        objSP.name = req.body.name;
        objSP.price = req.body.price;
        objSP.quantity = req.body.quantity;
        objSP.description = req.body.description;
        objSP.image = image;
        objSP._id=req.params.idpro;
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await db.proModel.findByIdAndUpdate({_id:req.params.idpro},objSP);
             res.redirect('/product');
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
exports.deleteproduct = async (req,res,next)=>{
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let objProduct = await db.proModel.findById(  req.params.idpro  );
    console.log( objProduct);
        
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await db.proModel.findByIdAndDelete({_id:req.params.idpro});
             res.redirect('/product');

            console.log("Đã xóa thành công");
            msg = 'Đã ghi thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
 

    res.render('product/list', {msg:msg});

}
exports.getDetail = async (req,res,next)=>{
    res.render('product/detailpro')
}
exports.sortproname = async(req,res,next)=>{
    //Hiển thị danh sach san pham
    
    //kiểm tra tồn tại tham số
    let dieu_kien =null;
    if(typeof(req.query.name)!='undefined'){
        let name =req.query.name;
        dieu_kien={name:name};
    }
    
    
    //var list=await myModel.spModel.find(dieu_kien).sort({name:1});
    //cair tieens lay them the loai
    var list=await db.proModel.find().sort({name:-1});
    console.log(list);
    
    res.render('product/list',{data:list})
    }


