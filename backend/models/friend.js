const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: ''
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: ''
    },
    status: {
        type: String,
        default: "pending"
    }
})

friendSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});


exports.Friend = mongoose.model('Friend', friendSchema);