const md = require('../../models/model');

exports.listBill = async  (req, res, next) =>{
    let dataReturn = {
        status: 1,
        msg: 'ok'
    }
    // code su ly lay danh sach o day'
    let list = [];

    try {
        list = await md.billModel.find();
        dataReturn.data = list
    } catch (error) {
        dataReturn.msg = error.message
    }
    

    // tra ve client
    res.json(dataReturn)

}

exports.addBill = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    let {date, name, email, phone, address, payment_methods, total_price, status} = req.body;

    if (!name || !email || !phone || !address || !date || !total_price || !payment_methods || !status) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objBill = new md.billModel();
        objBill.name = name;
        objBill.email = email;
        objBill.phone = phone;
        objBill.address = address;
        objBill.date = date;
        objBill.total_price = total_price;
        objBill.payment_methods = payment_methods;
        objBill.status = status;

    try {
        await objBill.save();
        return res.status(200).json({
            data,
            objBill
        })
    } catch (error) {
        dataReturn.msg = error.message
    }


    // tra ve client
    res.json(data)
}

exports.updateBill  = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    let {date, name, email, phone, address, payment_methods, total_price, status} = req.body;

    if (!date || !name || !email || !phone || !address || !total_price || !payment_methods || !status) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objBill = new md.billModel();
        objBill.date = date;
        objBill._id = req.params.idbill

    try {
        await md.billModel.updateOne({ _id: req.params.idbill }, objBill)
        return res.status(200).json({
            data,
            objBill
        })
    } catch (error) {
        dataReturn.msg = error.message
    }


    // tra ve client
    res.json(data)
}

exports.deleteBill  = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    // code su ly delete o day

    try {
        await md.billModel.deleteOne({ _id: req.params.idbill });
        return res.status(200).json({
            data
        })
    } catch (error) {
        dataReturn.msg = error.message
    }

    // tra ve client
    res.json(data)
}