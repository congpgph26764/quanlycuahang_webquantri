const fs = require('fs');
const myModel = require('../models/model');

exports.getHome = async (req,res,next)=>{
    res.render('index');
}
