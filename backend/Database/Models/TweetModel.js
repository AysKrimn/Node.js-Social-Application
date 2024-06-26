import mongoose from "mongoose";


// tweet > tweet comment modele
// tweet comment model > tweet
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


    // [yorum_id_1, yorum_id_2]
    comments: {

        type: [mongoose.SchemaTypes.ObjectId],
        ref: "comments",
    },


    attachment: {

        type: String,
    }


}, {

    timestamps: true
})



const model = mongoose.model("tweets", TweetSchema)


export default model