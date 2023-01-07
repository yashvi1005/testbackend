const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        // ref: 'Category',
        // required: true
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    comments:[{
        text:String,
        postedBy:{
                    type: Schema.Types.ObjectId,
                    ref: "user"
                }
    }],
    created: { 
        type: Date,
        default: Date.now
    }
})
const Blog = mongoose.model('blog', blogSchema)
module.exports = Blog