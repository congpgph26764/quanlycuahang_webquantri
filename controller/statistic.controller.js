const fs = require('fs');
const db = require('../models/model');
const path = require('path');


exports.getHome = async (req, res, next) => {
    res.render('index');
}

exports.listcat = async (req, res, next) => {
    var list = await db.catModel.find();
    console.log(list);

    res.render('statistic/statistic', { list: list })
}