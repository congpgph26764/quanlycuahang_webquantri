const fs = require('fs');
const myModel = require('../models/invoice.model');

exports.manage = async (req,res,next)=>{
    res.render('invoice/manageinvoice');
}