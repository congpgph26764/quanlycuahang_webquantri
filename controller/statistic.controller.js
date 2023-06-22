const fs = require('fs');
const db = require('../models/model');
const path = require('path');

exports.getHome = async (req, res, next) => {
    var listbill = await db.billModel.find();


    var totalByMonth = {'Tháng 1': 0, 'Tháng 2': 0, 'Tháng 3': 0, 'Tháng 4': 0, 'Tháng 5': 0, 'Tháng 6': 0,
    'Tháng 7': 0,'Tháng 8': 0,'Tháng 9': 0, 'Tháng 10': 0, 'Tháng 11': 0, 'Tháng 12': 0};

    var totalByYear = {};

    // Lặp qua từng đối tượng dữ liệu
    listbill.forEach(function(item) {
        if (item.status == "Đã hoàn thành") {
        
            var dateParts = item.date.split("-"); // Tách ngày thành mảng
            var month = "Tháng "+ parseInt(dateParts[1]); // Lấy phần tử thứ 2 là số tháng
            var year1 = parseInt(dateParts[2]);  // Lấy phần tử thứ 4 là số năm

            // Kiểm tra xem tổng cho tháng đã tồn tại chưa, nếu chưa thì khởi tạo
            
            if (!totalByMonth[month]) {
                totalByMonth[month] = 0;
            }

            // Kiểm tra xem tổng cho năm đã tồn tại chưa, nếu chưa thì khởi tạo
            if (!totalByYear[year1]) {
                totalByYear[year1] = 0;
                
            }

            if (year1 =="2023") {
                totalByMonth[month] += item.total_price; // Cộng tổng tiền cho tháng
            }
            
            totalByYear[year1] += item.total_price; // Cộng tổng tiền cho năm
        }

    });

    const year = Object.entries(totalByYear).map(([key, value]) => ({ [key]: value }));
    
    console.log(totalByMonth);
    console.log(year);

    var listdbill = await db.detailed_billModel.find();
    
    var list = await db.proModel.find().populate('id_category');
    var pro = list.length

    var listcat = await db.catModel.find();
    var cat = listcat.length

    var listfeedback = await db.feedbackModel.find();
    var feedback = listfeedback.length

    var listacc = await db.userModel.find();
    var acc = listacc.length

    res.render('index', {data: list, listdbill: listdbill, listbill: listbill, pro: pro, cat: cat, feedback: feedback, acc: acc, totalByMonth: totalByMonth, totalByYear: year});
}
