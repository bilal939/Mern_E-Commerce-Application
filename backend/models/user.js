const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        default: ''
    },
    Apartment: {
        type: String,
    },
    zip: {
        type: String,
    },

    city: {
        type: String,
    },

    country: {
        type: String,
    },

})

userschema.pre('save', async function (next) {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

userschema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

userschema.virtual('id').get(function (params) {
    return this._id.toHexString();
})

userschema.set('toJSON', {
    virtuals: true,
})

module.exports = mongoose.model('User', userschema);


