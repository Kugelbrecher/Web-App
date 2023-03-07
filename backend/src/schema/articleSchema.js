const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    author: {
        type: String,
    },
    title:{
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    date: {
        type: Date,
    },
    comments: {
        type: Array,
    },
    img:{
        type: String,
    }
})

module.exports = articleSchema;
