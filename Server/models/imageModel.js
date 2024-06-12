const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    path: {
        type: String,
        required: true
    }
})

const imageModel = mongoose.model("Image", imageSchema);
module.exports = imageModel;