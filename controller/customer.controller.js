const fs = require('fs');
const myModel = require('../models/model');
exports.manage = async (req,res,next)=>{
    res.render('customer/customermanager');
}
exports.feedback = async (req, res, next)=>{
    res.render('customer/feedback')
}