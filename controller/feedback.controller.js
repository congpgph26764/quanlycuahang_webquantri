const fs = require('fs');
const db = require('../models/model');


exports.getHome = async (req,res,next)=>{
    res.render('index');
}

exports.addFeed = async(req,res,next)=>{
    let msg = ''; // ghi câu thông báo

    if(req.method =='POST'){
        let objFeedback = new db.feedbackModel();
        objFeedback.name = req.body.name;
        objFeedback.phone = req.body.phone;
        objFeedback.email = req.body.email;
        objFeedback.comment = req.body.comment;
        objFeedback.question = req.body.question;
        
        try{
            let new_feed = await objFeedback.save();
            
            console.log(new_feed);

            console.log("Đã ghi thành công");
            msg = 'Đã thêm thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ error.message;

        }
 
    }
    res.render( 'feedback/addfeedback',{TieuDe:"Add Feedback"},)
}
exports.listFeed = async(req,res,next)=>{
var list=await db.feedbackModel.find();
console.log(list);

res.render('feedback/feedback',{list:list})
}

exports.deleteFeed = async (req,res,next)=>{
    let msg = ''; // chứa câu thông báo
    // load dữ liệu cũ để hiển thị
    let objFeed = await db.feedbackModel.findById(  req.params.idfeed  );
    console.log( objFeed);
        
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await db.feedbackModel.findByIdAndDelete({_id:req.params.idfeed});
             res.redirect('/feedback');
    
            console.log("Đã xóa thành công");
            msg = 'Đã ghi thành công';
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;
    
        }
    
    
    res.render('feedback/feedback', 
            {msg:msg})
    
    }
