const mongoose = require('mongoose');

// define what the data looks like, similar to a class in Java
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    salt: String,
    hash: String,
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    created: {
        type: Date,
        required: [true, 'Created date is required']
    },
    session: {
        type: String,
    },
    sessionTime:{
        type: Date,
    }
})

module.exports = userSchema;
