const mongoose = require("mongoose");
const comment = require("../models/commentModel");

const blogPostSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        cover: {
            trype: String,
            required: true
        },
        readTime: {
            value: { 
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
    },
        author: {
            type: Schema.type.ObjectId,
            ref: "Author"
        },
        comments: [{
            "text": String,
            "author": {
                type: Schema.Types.ObjectId,
                ref: "Author",
            },
        }]
    },
    { collection: "BlogPost"}
)

const blogPostModel = mongoose.model('BlogPost', blogPostSchema);
module.exports = blogPostModel;