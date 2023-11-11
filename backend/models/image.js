const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const imageSchema = new mongoose.Schema(
    {
        image_url: {
            type: String,
            required: true
        },
        image_caption: {
            type: String,
            required: true
        },
        user: {
            type: ObjectId,
            ref: "User",
            required: true
        }
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model("Image", imageSchema);