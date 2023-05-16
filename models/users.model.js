var db = require('./db');
const userSchema = new db.mongoose.Schema(
    {
        email: { type: String, require: true },
        username:{type:String,require:true},
        passwd:{type:String,require:true},
        role:{type:String,require:true},

    },
    {collection:'users'}
);


let usersModel = db.mongoose.model('usersModel',userSchema);
module.exports={
    usersModel
}