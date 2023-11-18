const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const imageSchema = new mongoose.Schema(
    {
        image_url: {
            type: String,
            required: true,
            unique: true
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

imageSchema.index({image_caption: 'text'});

module.exports = mongoose.model("Image", imageSchema);