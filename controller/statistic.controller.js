const fs = require('fs');
const myModel = require('../models/statistic.model');

exports.manage = async (req,res,next)=>{
    res.render('statistic/statistic');
}