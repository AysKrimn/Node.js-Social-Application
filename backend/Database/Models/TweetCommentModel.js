import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({

    author: {

        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true
    },

    tweet: {

        type: mongoose.SchemaTypes.ObjectId,
        ref: "tweets",
        required: true
    },

    comment: {

        type: String,
        required: true
    },

    attachment: {

        type: String,
    }


}, {

    timestamps: true
})



const model = mongoose.model("comments", CommentSchema)


export default model