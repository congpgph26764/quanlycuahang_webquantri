const md = require('../../models/model');

exports.listDetailed_bill = async  (req, res, next) =>{
    let dataReturn = {
        status: 1,
        msg: 'ok'
    }
    // code su ly lay danh sach o day'
    let list = [];

    try {
        list = await md.detailed_billModel.find();
        dataReturn.data = list
    } catch (error) {
        dataReturn.msg = error.message
    }
    

    // tra ve client
    res.json(dataReturn)

}

exports.addDetailed_billl = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    let {quantity, id_bill, id_product, id_user} = req.body;

    if (!quantity || !id_bill || !id_product || !id_user) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objDetailed_bill = new md.detailed_billModel();
        objDetailed_bill.quantity = quantity;
        objDetailed_bill.id_bill = id_bill;
        objDetailed_bill.id_product = id_product;
        objDetailed_bill.id_user = id_user;

    try {
        await objDetailed_bill.save();
        return res.status(200).json({
            data,
            objDetailed_bill
        })
    } catch (error) {
        dataReturn.msg = error.message
    }


    // tra ve client
    res.json(data)
}

exports.updateDetailed_bill  = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    let {quantity, id_bill, id_product, id_user} = req.body;

    if (!quantity || !id_bill || !id_product || !id_user) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objDetailed_bill = new md.detailed_billModel();
        objDetailed_bill.quantity = quantity;
        objDetailed_bill.id_bill = id_bill;
        objDetailed_bill.id_product = id_product;
        objDetailed_bill.id_user = id_user;
        objDetailed_bill._id = req.params.iddetailed_bill

    try {
        await md.detailed_billModel.updateOne({ _id: req.params.iddetailed_bill }, objDetailed_bill)
        return res.status(200).json({
            data,
            objDetailed_bill
        })
    } catch (error) {
        dataReturn.msg = error.message
    }


    // tra ve client
    res.json(data)
}

exports.deleteDetailed_bill  = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    // code su ly delete o day

    try {
        await md.detailed_billModel.deleteOne({ _id: req.params.iddetailed_bill });
        return res.status(200).json({
            data
        })
    } catch (error) {
        dataReturn.msg = error.message
    }

    // tra ve client
    res.json(data)
}