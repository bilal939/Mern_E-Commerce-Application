const mongoose = require('mongoose');


const productscehema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    },
    Images:[{
        type:String
    }],
    brand:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    countinStock:{
        type:Number,
        default:0,
        min:0,
        max:255
    },
    ratings:{
        type:Number,
        default:0
    },
    Numreviews:{
        type:Number,
        default:0
    },
    isfeatured:{
        type:Boolean,
        default:false
    },
    DateCreated:{
        type:Date,
        default:Date.now
    }
})

productscehema.virtual('id').get(function(params) {
    return this._id.toHexString();
})

productscehema.set('toJSON',{
    virtuals:true,
})

module.exports = mongoose.model('Product',productscehema);


