const fs = require('fs');
const myModel = require('../models/product.model');
exports.list = async (req,res,next)=>{
    res.render('product/listproduct');
}
exports.manage = async (req,res,next)=>{
    res.render('product/manageproduct');
}