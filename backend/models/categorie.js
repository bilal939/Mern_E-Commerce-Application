const mongoose = require('mongoose');


const Categoryschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Iconname:{
        type:String,
        // required:true
    },
    Color:{
        type:String,
        // required:true
    },
    
})


Categoryschema.virtual('id').get(function(params) {
    return this._id.toHexString();
})

Categoryschema.set('toJSON',{
    virtuals:true,
})

module.exports = mongoose.model('Category',Categoryschema);