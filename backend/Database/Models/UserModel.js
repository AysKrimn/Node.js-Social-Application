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
    }



})



const UserModel = mongoose.model("user", UserSchema)

export default UserModel