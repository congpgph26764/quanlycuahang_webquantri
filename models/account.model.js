const myDb = require('./db');
const userSchema = new myDb.mongoose.Schema(
    {
        username: {type: String, required: true},
        passwd: { type: String, required: true},
        email: { type: String , required: true}
    },
    {
        collection: 'tb_user'
    }
);
const dangNhapSchema = myDb.mongoose.Schema(
    {
        // đối tượng này định nghĩa cấu trúc của model 
        username: { type: String , required: true }, // yêu cầu bắt buộc phải nhập và chỉ nhập chuối
        passwd: { type: String, required: true},
        // description: {type: String, required: false}, // không bắt buộc nhập
        email :{type:  String,required: true}
    },
    {
        collection: 'dangnhap'  // xác định tên collection trong CSDL 
    }
);
const dangKiSchema = myDb.mongoose.Schema(
    {
        // đối tượng này định nghĩa cấu trúc của model 
        username: { type: String , required: true }, // yêu cầu bắt buộc phải nhập và chỉ nhập chuối
        passwd: { type: String, required: true},
        passwd2: { type: String, required: true},
        // description: {type: String, required: false}, // không bắt buộc nhập
        email :{type:  String,required: true}
    },
    {
        collection: 'dangki'  // xác định tên collection trong CSDL 
    }
);

let UserModel = myDb.mongoose.model('UserModel', userSchema);
 
let dangNhapModel = myDb.mongoose.model('dangNhapModel',dangNhapSchema);

let dangKiModel = myDb.mongoose.model('dangKiModel',dangKiSchema);

module.exports = { UserModel,dangNhapModel , dangKiModel}