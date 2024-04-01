const mongoose = require('mongoose')


const OrderSchema = mongoose.Schema({
    orderitems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Orderitem',
        required:true
    }],
    shippingAddress1:{
        type:String,
        required:true
    },
    shippingAddress2:{
        type:String,
        required:true 
    },
    zip: {
        type: String,
        required:true 
    },

    city: {
        type: String,
        required:true 
    },

    country: {
        type: String,
        required:true 
    },
    phone: {
        type: String,
        required:true 
    },
    status:{
        type: String,
        required:true ,
        default:"pending"
    },
    totalPrice:{
        type: Number,
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    dateOrder:{
        type:Date,
        default:Date.now
    }
})



OrderSchema.virtual('id').get(function(params) {
    return this._id.toHexString();
})

OrderSchema.set('toJSON',{
    virtuals:true,
})
module.exports = mongoose.model('Order',OrderSchema);