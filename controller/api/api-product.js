const md = require('../../models/model');

exports.listPro = async  (req, res, next) =>{
    // code su ly lay danh sach o day
    let list = [];


    try {


        list = await md.proModel.find( );

        dataReturn = list
    } catch (error) {
        dataReturn.msg = error.message
    }
    

    // tra ve client
    res.json(dataReturn)

}

exports.addPro = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    let {name, id_category, price, quantity, image, description} = req.body;

    if (!name || !id_category || !price || !quantity || !image || !description) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objSP = new md.proModel();
        objSP.name = name;
        objSP.price = price;
        objSP.quantity = quantity;
        objSP.description = description;
        objSP.id_category = id_category;
        objSP.image = image;

    try {
        await objSP.save();
        return res.status(200).json({
            data,
            objSP
        })
    } catch (error) {
        dataReturn.msg = error.message
    }


    // tra ve client
    res.json(data)
}

exports.updatePro = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    let {name, id_category, price, quantity, image, description} = req.body;

    if (!name || !id_category || !price || !quantity || !image || !description) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objSP = new md.proModel();
        objSP._id = req.params.idpro;
        objSP.name = name;
        objSP.price = price;
        objSP.quantity = quantity;
        objSP.description = description;
        objSP.id_category = id_category;
        objSP.image = image;

    try {
        await md.proModel.updateOne( { _id: req.params.idpro },   objSP );
        return res.status(200).json({
            data,
            objSP
        })
    } catch (error) {
        dataReturn.msg = error.message
    }


    // tra ve client
    res.json(data)
}

exports.deletePro = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    // code su ly delete o day

    try {
        await md.proModel.deleteOne({ _id: req.params.idpro });
        return res.status(200).json({
            data
        })
    } catch (error) {
        dataReturn.msg = error.message
    }

    // tra ve client
    res.json(data)
}