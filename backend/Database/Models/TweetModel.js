import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({

    author: {

        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: true
    },

    tweet: {

        type: String,
        required: true
    },

    attachment: {

        type: String,
    }


}, {

    timestamps: true
})



const model = mongoose.model("tweets", TweetSchema)


export default model