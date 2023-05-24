const md = require('../../models/model');

exports.listUser = async  (req, res, next) =>{
    // code su ly lay danh sach o day
    let list = [];

    let keyword = req.query.keyword;
    let objWhere = {};

    try {
        
        if(keyword !== '') objWhere.email = new RegExp(keyword, 'i');

        list = await md.userModel.find( objWhere );

        dataReturn = list;
    } catch (error) {
        dataReturn.msg = error.message
    }
    

    // tra ve client
    res.json(dataReturn)

}

exports.addUser = async (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    let {name, role, email, phone, password, address} = req.body;

    if (!name || !role || !email || !phone || !password || !address) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objU = new md.userModel();
        objU.name = name;
        objU.role = role;
        objU.email = email;
        objU.phone = phone;
        objU.password = password;
        objU.address = address;

    try {
        await objU.save();
        return res.status(200).json({
            data,
            objU
        })
    } catch (error) {
        dataReturn.msg = error.message
    }


    // tra ve client
    res.json(data)
}

exports.updateUser = async (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    let {name, role, email, phone, password, address} = req.body;

    if (!name || !role || !email || !phone || !password || !address) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objU = new md.userModel();
        objU._id = req.params.idu;
        objU.name = name;
        objU.role = role;
        objU.email = email;
        objU.phone = phone;
        objU.password = password;
        objU.address = address;

    try {
        await md.userModel.updateOne( { _id: req.params.idu },   objU );
        return res.status(200).json({
            data,
            objU
        })
    } catch (error) {
        dataReturn.msg = error.message
    }


    // tra ve client
    res.json(data)
}

exports.deleteUser = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    // code su ly delete o day

    try {
        await md.userModel.deleteOne({ _id: req.params.idu });
        return res.status(200).json({
            data
        })
    } catch (error) {
        dataReturn.msg = error.message
    }

    // tra ve client
    res.json(data)
}