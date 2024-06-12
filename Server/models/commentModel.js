const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Author",
        },
        blog: {
            trype: Schema.Types.ObjectId,
            ref: "BlogPost",
        }
    },
    { collection: "comments" }
)

const commentModel = mongoose.model('Comment', commentSchema);
module.exports = commentModel;