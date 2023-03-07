const mongoose = require('mongoose');

// random image generator: https://picsum.photos/200/300

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    headline: {
        type: String,
    },
    email: {
        type: String,
    },
    zipcode: {
        type: String,
    },
    dob: {
        type: Date,
    },
    avatar: {
        type: String,
    },
    following: {
    type: Array,
}
})

module.exports = profileSchema;
