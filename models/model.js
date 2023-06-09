var db = require('./db');
const userSchema = new db.mongoose.Schema(
    {

        name: { type: String , required: false }, 
        role: { type: String, required: true},
        email: { type: String, required: true},
        phone: { type: String, required: false},
        password: { type: String, required: true},
        address: { type: String, required: false},
    },
    {
        collection: 'users' 
    }
);

const proSchema = new db.mongoose.Schema(
    {

        name: { type: String , required: true }, 
        price: { type: Number, required: true},
        quantity: { type: Number, required: true},
        description: { type: String, required: true},
        image: { type: String, required: false},
        id_category: { type: db.mongoose.Schema.Types.ObjectId, ref: 'catModel'}
    },
    {
        collection: 'products'
    }
);

const catSchema = new db.mongoose.Schema(
    {
        name: {type: String, required :true}
    },
    {
        collection: "categories"
    }
);

const billSchema = new db.mongoose.Schema(
    {
       idBill: { type: Number , required: true },
       name: { type: String , required: true }, 
       email: { type: String , required: true}, 
       phone: { type: String , required: true }, 
       address: { type: String , required: true }, 
       date: { type: String , required: true },
       total_price: { type: Number , required: true }, 
       payment_methods: { type: String , required: true }, 
       note: { type: String , required: false }, 
       status: { type: String , required: true },
       id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel'}
    },
    {
        collection: 'bill'
    }
);

const detailed_billSchema = new db.mongoose.Schema(
    {
        name: { type: String , required: true },
        price: { type: Number , required: true },
        id_bill: { type: Number , required: true },
        quantity: { type: Number , required: true }, 
    },
    {
        collection: 'detailed_bill'
    }
);

const feedbackSchema = new db.mongoose.Schema(
    {
        fullname: { type: String , required: true },
        phone: { type: String , required: true },
        email: { type: String , required: true },
        comment: { type: String , required: true }, 
        image: { type: String , required: false },
    },
    {
        collection: 'feedback'
    }
);

let userModel = db.mongoose.model('userModel', userSchema );
let proModel = db.mongoose.model('proModel', proSchema );
let catModel = db.mongoose.model("catModel", catSchema);
let billModel = db.mongoose.model('billModel', billSchema );
let detailed_billModel = db.mongoose.model('detailed_billModel', detailed_billSchema );
let feedbackModel = db.mongoose.model('feedbackModel', feedbackSchema );


module.exports = {
    userModel, proModel, catModel, billModel, detailed_billModel, feedbackModel
}