const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followers:[{
        type:Schema.Types.ObjectId,
        ref:"user"
    }],
    following:[{
        type:Schema.Types.ObjectId,
        ref:"user"
    }],
    date: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('user', userSchema)
// User.createIndexes();
module.exports = User