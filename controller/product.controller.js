const fs = require('fs');
const myModel = require('../models/model');
exports.list = async (req,res,next)=>{
    res.render('product/listproduct');
}
exports.manage = async (req,res,next)=>{
    res.render('product/manageproduct');
}