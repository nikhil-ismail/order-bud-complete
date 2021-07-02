const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    address: [
        {
            fullAddress: {
                type: String,
            },
            addressPrimaryText: {
                type: String
            },
            addressSecondaryText: {
                type: String
            },
            addressPlaceId: {
                type: String
            },
            active: {
                type: Boolean
            }
        }
    ]
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
