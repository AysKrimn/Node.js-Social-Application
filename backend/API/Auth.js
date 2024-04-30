import express from "express"
// router
const route = express.Router()

// user model
import UserModel from "../Database/Models/UserModel.js"

import bcrpyt from 'bcrypt'

// jwt
import jwt from 'jsonwebtoken'



route.get("/recent", async (request, response) => {

        const today = new Date()
        today.setHours(today.getHours() - 24)

        // greater than equal
        const recent_users = await UserModel.find({ createdAt: { $gte: today} })

        response.status(200).json({ data: recent_users })

})

route.post("/verify/token", (request, response) => {

    const { token } = request.body

    if (!token) {

        return response.status(400).json({ data: "Token belirtilmedi."})
    }


    jwt.verify(token, process.env["JWT_SECRET"], function(error, user) {


        if (error) {

            return response.status(401).json({ data: "Geçersiz token"})
        }


        return response.status(200).json({ data: user})

    })


})

route.post("/login", async (request, response) => {

    const { username, password } = request.body

    if (!username || !password) {

        return response.status(400).json({ data: "Lütfen gerekli tüm alanları doldurun."})
    }

    // useri bul
    const user = await UserModel.findOne({
        // field lookup
        $or: [

            { username: username },
            { email: username}
        ]
    })

    if (user === null) {

        return response.status(404).json({ data: "Böyle bir hesap bulunamadı."})
    }

    const correct_password = await bcrpyt.compare(password, user.password)

    if (!correct_password) {

        return response.status(400).json({ data: "Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz."})
    }


    // tokende tutulması gerekne verileri ayarla
    const payload = {

            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
    }

    const token = jwt.sign(payload, process.env['JWT_SECRET'])

    response.status(200).json({ data: "ok", user: user, token: token})

})



route.post("/register", async (request, response) => {

    const { email, username, password, password2} = request.body
    
    if (!email || !username || !password || !password2) {


        return response.status(400).json({ data: "Lütfen gerekli tüm alanları doldurunuz."})
    }

    // if (!["@"].includes(email)) {

    //     return response.status(400).json({ data: "Lütfen geçerli bir e-mail adresi giriniz."})
    // }
    
    // böyle bir user var mı
    const isRegistered = await UserModel.findOne({ email })

    if (isRegistered != null) {

        return response.status(400).json({ data: "Bu e-mail zaten kayıtlı"})
    }

    if (password !== password2) {

        return response.status(400).json({ data: "Şifreler birbirleriyle eşleşmiyor"})
    }


    // password hashle
    const hashPassword = await bcrpyt.hash(password, 10)
    
    // veritabanına kayıt et
    const new_user = await UserModel.create({

            username,
            email,
            password: hashPassword
    })


    response.status(201).json({ data: "isteğini aldım.", user: new_user})

})


export { route }