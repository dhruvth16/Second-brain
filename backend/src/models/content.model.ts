import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
    link: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    type: {
        type: String,
        required: true,
        enum: ['image', 'video', 'article', 'audio']
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }],
    ceratedAt: {
        type: Date,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export const ContentModel = mongoose.model("Content", ContentSchema)
