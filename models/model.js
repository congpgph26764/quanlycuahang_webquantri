var db = require('./db');
const userSchema = new db.mongoose.Schema(
    {

        name: { type: String , required: true }, 
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
        description: { type: String, required: false},
        image: { type: String, required: true},
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

       date: { type: String , required: true }, 
    },
    {
        collection: 'bill'
    }
);

const detailed_billSchema = new db.mongoose.Schema(
    {

        quantity: { type: Number, required: true }, 
        id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel'},
        id_bill: { type: db.mongoose.Schema.Types.ObjectId, ref: 'billModel'},
        id_product: { type: db.mongoose.Schema.Types.ObjectId, ref: 'proModel'}
    },
    {
        collection: 'detailed_bill'
    }
);

const feedbackSchema = new db.mongoose.Schema(
    {

        comment: { type: String , required: true }, 
        id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel'},
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