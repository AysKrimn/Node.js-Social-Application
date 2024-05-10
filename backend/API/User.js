import express from 'express'
const route = express.Router()

import check_token from '../ValidateToken/check_token.js'

// user şeması
import UserModel from '../Database/Models/UserModel.js'
import TweetModel from '../Database/Models/TweetModel.js'

// jwt
import jwt from "jsonwebtoken"
// hash mekanizması
import bcrypt from "bcrypt"

// user avatar middleware
import { user_avatar_upload } from '../ImageService/StorageConfig.js'




route.get("/users/:username", async (request, response) => {

    const query_username = request.params.username

    // ilgili useri bul
    const user = await UserModel.findOne({ username: query_username })

    if (user) {

        // bu usere ait tweetleri getir
        const user_tweets = await TweetModel.find({ author: user._id }).populate("author")
        
        const model = {

            profile: user,
            post_tweets: user_tweets
        }

        return response.status(200).json({ data: model})

    } else {

        return response.status(404).json({ data: "Böyle bir kullanıcı bulunamadı"})
    }

})


// kullanıcı bilgilerini değiştiriğimiz kısım
route.post("/users/:userid/update", check_token, user_avatar_upload.single("avatar"), async (request, response) => {

    const { username, email, password, password_again } = request.body
    const { avatar } = request.file
  
    // isteği yapan / veya güncelleme yapılan kullanıcıyı bul
    try {

        const userId = request.params.userid
        const target_user = await UserModel.findOne({ _id: userId })

        if (!target_user) { 
            return response.status(404).json({ data: "böyle bir user bulunamadı"})
        }
        
        // eğer user varsa
        if (username) {

            target_user.username = username
        }

        if (email) {

            target_user.email = email
        }
 
        
        if (password && password_again) {

            // bu iki şifre birbiriyle uyuşuyor mu?
            if (password === password_again) {

                // hashle
                const new_hashed_password = await bcrypt.hash(password, 10)
                target_user.password = new_hashed_password

            } else {

                // şifreler birbiriyle uyuşmuyor
                return response.status(400).json({ data: "Şifreler birbirleri ile uyuşmuyor"})
            }
        }

        // avatarı db'e kaydet


        // user modeline kaydet
        const updated_user = await target_user.save()
        // token güncelle
        const payload = {

            id: target_user._id,
            username: target_user.username,
            email: target_user.email,
            role: target_user.role
        }

    
        const updated_token = jwt.sign(payload, process.env['JWT_SECRET'])
        // user güncellenmiştir
        response.status(201).json({ data: updated_user, token: updated_token})

    } catch (error) {
        
        console.log("USER UPDATE API:", error)

        let statusCode = ""
        let message = ""

        // geçersiz user id
        if (error.name === "CastError") {

            statusCode = 404
            message = "Güncellemek istediğiniz user mevcut değil."
        } else {

                statusCode = 500
                message = "Geçici bir problem yaşıyoruz lütfen daha sonra tekrar deneyiniz."
        }

        return response.status(statusCode).json({ data: message})
        
        
    }

})


export { route }