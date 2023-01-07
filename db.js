const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://yashvi:Tc91gSYMc0O5Bviy@cluster0.cshlb.mongodb.net/blogpost"

const connectToMongo = async () => {
    mongoose.connect(mongoURI, () => {
        console.log('connected to mongo')
    })
}

module.exports = connectToMongo