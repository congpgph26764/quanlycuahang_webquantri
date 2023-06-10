const md = require('../../models/model');

exports.listFeedback = async  (req, res, next) =>{
    // code su ly lay danh sach o day'
    let list = [];


    try {

        list = await md.feedbackModel.find( );

        dataReturn = list;
    } catch (error) {
        dataReturn.msg = error.message
    }
    

    // tra ve client
    res.json(dataReturn)

}

exports.addFeedback = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    let {name, phone, email, comment, image} = req.body;

    if (!name || !phone || !email || !comment || !image) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objFeedback = new md.feedbackModel();
        
        objFeedback.name = name;
        objFeedback.phone = phone;
        objFeedback.email = email;
        objFeedback.comment = comment;
        objFeedback.image = image;

    try {
        await objFeedback.save();
        return res.status(200).json({
            data,
            objFeedback
        })
    } catch (error) {
        dataReturn.msg = error.message
    }


    // tra ve client
    res.json(data)
}

exports.updateFeedback  = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    let {name, phone, email, comment, image} = req.body;

    if (!name || !phone || !email || !comment || !image) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objFeedback = new md.feedbackModel();
        objFeedback._id = req.params.idfeedback
        objFeedback.name = name;
        objFeedback.phone = phone;
        objFeedback.email = email;
        objFeedback.comment = comment;
        objFeedback.image = image;

    try {
        await md.feedbackModel.updateOne({ _id: req.params.idfeedback }, objFeedback)
        return res.status(200).json({
            data,
            objFeedback
        })
    } catch (error) {
        dataReturn.msg = error.message
    }


    // tra ve client
    res.json(data)
}

exports.deleteFeedback  = async  (req, res, next) =>{
    let data = {
        status: 1,
        msg: 'ok'
    }
    // code su ly delete o day

    try {
        await md.feedbackModel.deleteOne({ _id: req.params.idfeedback });
        return res.status(200).json({
            data
        })
    } catch (error) {
        dataReturn.msg = error.message
    }

    // tra ve client
    res.json(data)
}