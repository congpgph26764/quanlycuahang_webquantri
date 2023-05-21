const md = require('../../models/model');

exports.listCat = async  (req, res, next) =>{
    let dataReturn = {
        status: 1,
        msg: 'ok'
    }
    // code su ly lay danh sach o day'
    let list = [];

    try {
        list = await md.catModel.find();
        dataReturn.data = list
    } catch (error) {
        dataReturn.msg = error.message
    }
    

    // tra ve client
    res.json(dataReturn)

}

exports.addCat = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    let {name} = req.body;

    if (!name) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objCat = new md.catModel();
        objCat.name = name;

    try {
        await objCat.save();
        return res.status(200).json({
            data,
            objCat
        })
    } catch (error) {
        dataReturn.msg = error.message
    }


    // tra ve client
    res.json(data)
}

exports.updateCat  = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    let {name} = req.body;

    if (!name) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objCat = new md.catModel();
        objCat.name = name;
        objCat._id = req.params.idcat

    try {
        await md.catModel.updateOne({ _id: req.params.idcat }, objCat)
        return res.status(200).json({
            data,
            objCat
        })
    } catch (error) {
        dataReturn.msg = error.message
    }


    // tra ve client
    res.json(data)
}

exports.deleteCat  = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    // code su ly delete o day

    try {
        await md.catModel.deleteOne({ _id: req.params.idcat });
        return res.status(200).json({
            data
        })
    } catch (error) {
        dataReturn.msg = error.message
    }

    // tra ve client
    res.json(data)
}