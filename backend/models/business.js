const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    fullAddress: {
        type: String,
        default: '',
    },
    addressPrimaryText: {
        type: String,
        default: '',
    },
    addressSecondaryText: {
        type: String,
        default: '',
    },
    addressPlaceId: {
        type: String,
        default: '',
    },
    coverImage: {
        type: String,
        default: ''
    },
    profileImage: {
        type: String,
        default: ''
    },
    ratings: [{
        type: Number,
        default: [],
    }],
    rating: {
        type: Number,
        default: 0,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
    delivery: {
        type: Boolean,
        default: false,
    },
    pickup: {
        type: Boolean,
        default: false,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: []
    }],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    owner: {
        type: String,
        required: true
    },
})

businessSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});


exports.Business = mongoose.model('Business', businessSchema);
