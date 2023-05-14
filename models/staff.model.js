var db = require('./db');


const staffSchema = new db.mongoose.Schema(
    {
        // đối tượng này định nghĩa cấu trúc của model 
        name: { type: String , required: true }, // yêu cầu bắt buộc phải nhập và chỉ nhập chuối
        price: { type: Number, required: true},
        // description: {type: String, required: false}, // không bắt buộc nhập
    },
    {
        collection: 'staff'  // xác định tên collection trong CSDL 
    }

);

let staffModel = db.mongoose.model('staffModel', staffSchema );

module.exports = {
    staffModel
}