const fs = require('fs');
const myModel = require('../models/staff.model');
exports.manage = async (req,res,next)=>{
    res.render('staff/staffmanager');
}
exports.addstaff = async (req, res, next)=>{
    res.render('staff/addstaff')
}