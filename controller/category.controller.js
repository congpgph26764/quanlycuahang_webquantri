const fs = require('fs');
const db = require('../models/model');
const path = require('path');

exports.addCat = async (req, res, next) => {
    let msg = ''; // ghi câu thông báo
    var url_image = '';
    let image = "";

    let listCat = await db.catModel.find();

    if (req.method == 'POST') {



        await fs.promises.rename(req.file.path, './public/uploads/' + req.file.originalname)
        url_image = '/uploads/' + req.file.originalname;
        console.log("upload thành công" + url_image);

        // Đường dẫn đến file ảnh
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


        let objCat = new db.catModel();
        objCat.name = req.body.name;
        objCat.image = image;

        try {
            let new_cat = await objCat.save();
            console.log(new_cat);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;

        }

    }
    res.render('category/addcategory', { listCat: listCat })
}
exports.listcat = async (req, res, next) => {
    var list = await db.catModel.find();
    console.log(list);

    res.render('category/category', { list: list })
}

exports.deleteCat = async (req, res, next) => {
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let objCat = await db.catModel.findById(req.params.idcat);
    console.log(objCat);

    try {

        // update dữ liệu
        // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
        await db.catModel.findByIdAndDelete({ _id: req.params.idcat });
        res.redirect('/category');

        console.log("Đã xóa thành công");
        msg = 'Đã ghi thành công';
    } catch (err) {
        console.log(err);
        msg = 'Lỗi ' + err.message;

    }


    res.render('category/category',
        { msg: msg })

}
exports.editcat = async (req, res, next) => {
    let msg = ''; // chứa câu thông báo
    var url_image = '';
    let image = "";
    // load dữ liệu cũ để hiển thị
    let objCat = await db.catModel.findById(req.params.idcat);
    console.log(objCat);
    if (req.method == 'POST') {

        await fs.promises.rename(req.file.path, './public/uploads/' + req.file.originalname)
        url_image = '/uploads/' + req.file.originalname;
        console.log("upload thành công" + url_image);

        // Đường dẫn đến file ảnh
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


        let objCat = new db.catModel();
        objCat.name = req.body.name;
        objCat.image = image;
        objCat._id = req.params.idcat;
        try {

            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
            await db.catModel.findByIdAndUpdate({ _id: req.params.idcat }, objCat);
            res.redirect('/category');
            console.log("Đã ghi thành công");
            msg = 'Đã ghi thành công';

        } catch (err) {
            console.log(err);
            msg = 'Lỗi ' + err.message;

        }

    }

    res.render('category/editcategory',
        { msg: msg, objCat: objCat })

}