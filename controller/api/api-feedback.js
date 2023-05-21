const md = require('../../models/model');

exports.listFeedback = async  (req, res, next) =>{
    let dataReturn = {
        status: 1,
        msg: 'ok'
    }
    // code su ly lay danh sach o day'
    let list = [];

    try {
        list = await md.feedbackModel.find();
        dataReturn.data = list
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
    let {comment, id_user} = req.body;

    if (!comment || !id_user) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objFeedback = new md.feedbackModel();
        objFeedback.comment = comment;
        objFeedback.id_user = id_user;

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
    let {comment, id_user} = req.body;

    if (!comment || !id_user) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    let objFeedback = new md.feedbackModel();
        objFeedback.comment = comment;
        objFeedback.id_user = id_user;
        objFeedback._id = req.params.idfeedback

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