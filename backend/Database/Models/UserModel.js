import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({


    username: {

        type: String,
        required: true
    },


    email: {

        type: String,
        required: true
    },


    password: {

        type: String,
        required: true
    },



    role: {


        type: [],
        default: ["User"]

        // user veya admin olabilir
    },

    avatar: {

        type: String,
        default: `${process.env["DEVELOPMENT_DOMAIN"]}/avatars/default/no_avatar.jpg`
    }

}, {
    // createdAt & updatedAt
    timestamps: true
})



const UserModel = mongoose.model("user", UserSchema)

export default UserModel