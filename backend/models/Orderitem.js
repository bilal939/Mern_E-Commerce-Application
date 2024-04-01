const mongoose = require('mongoose');


const Orderitemsschema = mongoose.Schema({
   quantity:{
    type:Number,
    required:true
   },
   Product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product',
    required:true
},
})


module.exports = mongoose.model('Orderitem',Orderitemsschema);