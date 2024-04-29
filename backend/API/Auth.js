import express from "express"
// router
const route = express.Router()

// user model
import UserModel from "../Database/Models/UserModel.js"

import bcrpyt from 'bcrypt'
import jwt from "jsonwebtoken"
import { tweet_attachment_upload } from "../ImageService/multer.js"



route.post("/create/tweet", tweet_attachment_upload.single("attachment"), async (request, response) => {

    console.log("REQUEST FILE:", request.file, "veya", request.files)
    console.log("body", request.body)

    const user = await UserModel.findOne({ _id: "662eff82b29f5dab3fffebd2"})
    user.avatar = request.file.path
    await user.save()

    return response.json({ data: "ok"})
})

route.get("/recent", async (request, response) => {

    const today = new Date();
    today.setHours(today.getHours() - 24);

    const recentUsers = await UserModel.find({ createdAt: { $gte: today } })

    return response.status(200).json({ data: recentUsers})

})

route.post("/verify", async (request, response) => {

    const { token } = request.body

    if (!token) return response.status(400).json({ data: "Token belirtilmedi"})

    try {
       
        const user = jwt.verify(token, process.env["JWT_SECRET"])

        return response.status(200).json({ data: user})

    } catch (error) {
        
        response.status(400).json({ data: "geçersiz token"})
    }
 

})

route.post("/login", async (request, response) => {

    const { username, password } = request.body

    if (!username || !password) {

        return response.status(400).json({ data: "Lütfen gerekli tüm alanları doldurun."})
    }

    // useri bul
    const user = await UserModel.findOne({ 
        
        $or: [

            {username},
            {email: username}
        ]
   
    })

    if (user === null) {

        return response.status(404).json({ data: "Böyle bir hesap bulunamadı."})
    }

    const correct_password = await bcrpyt.compare(password, user.password)

    if (!correct_password) {

        return response.status(400).json({ data: "Lütfen girdiğiniz bilgileri kontrol edip tekrar deneyiniz."})
    }


    const payload = { username: user.username, email: user.email, role: user.role }
    const token = jwt.sign(payload, process.env['JWT_SECRET'])

    response.status(200).json({ data: "ok", user: user, token: token })

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