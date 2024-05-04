import express, { response } from 'express'
const route = express.Router()

// tweet model
import TweetModel from "../Database/Models/TweetModel.js"

// güvenlik mekanizması
import check_token from '../ValidateToken/check_token.js'


// resim upload
import { tweet_attachment_upload } from '../ImageService/StorageConfig.js'


route.get("/tweets", async (request, response) => {

        // tüm tweetleri çek
        const all_tweets = await TweetModel.find().populate("author")

        response.status(200).json({ data: all_tweets})

})
// buradan itibaren token kontrolü yapılmaya başlanır
route.use(check_token)
// tweet oluşturma
route.post("/tweet/create", tweet_attachment_upload.single("attachment"), async (request, response) => {

        console.log("REQUESTTEKI USER:", request.user)
        console.log("body:", request.body)
        console.log("ek", request.file)
        
        const { tweet } = request.body
        
        let path = null

        if (!tweet) {

        return response.status(400).json({ data: "Boş bir tweet gönderemezsin."})
        }

       

        // tweet modelini oluştur
        const payload = {

                author: request.user.id, 
                tweet: tweet,

        }

        if (request.file) {

                path = `${request.file.fieldname}/${request.file.filename}`
                payload.attachment = path
        }

        // tweet oluştur
        const tweetInstance = await TweetModel.create(payload)       
     
 
        response.status(201).json({ data: tweetInstance })

})



// tweet güncelleme 
route.post("/tweet/:tweetId/update", async (request, response) => {
     
     const { newContent } = request.body

     if (!newContent) {

        return response.status(400).json({ data: "Lütfen gerekli alanları doldurunuz."})
     }

     const tweetId = request.params.tweetId
     // ilgili tweet bul
     try {
        
        const tweet = await TweetModel.findOne({ _id: tweetId}).populate("author")

        // tweet güncelle
        tweet.tweet = newContent
        // db güncelle
        await tweet.save()

        return response.status(201).json({data: tweet})

     } catch (error) {

        console.log("[TWEET UPDATE ENDPOINT] ERROR:", error)

        let statusCode = ""
        let message = ""

        if (error.name === "CastError") {

            statusCode = 404
            message = "Güncellemek istediğiniz tweet mevcut değil."
        } else {

                statusCode = 500
                message = "Geçici bir problem yaşıyoruz lütfen daha sonra tekrar deneyiniz."
        }

        return response.status(statusCode).json({ data: message})
        
     }

})


// tweet silme api
route.post("/tweet/:tweetId/delete", async (request, response) => {

        try {
                const tweet = await TweetModel.findOne({ _id: request.params.tweetId}).populate("author")
                await tweet.deleteOne()

                return response.status(200).json({ data: "Tweet başarılı bir şekilde silindi."})
                
        } catch (error) {


                console.log("[TWEET DELETE ENDPOINT] ERROR:", error)

                let statusCode = ""
                let message = ""
        
                if (error.name === "CastError") {
        
                    statusCode = 404
                    message = "Silmek istediğiniz tweet mevcut değil."
                } else {
        
                        statusCode = 500
                        message = "Geçici bir problem yaşıyoruz lütfen daha sonra tekrar deneyiniz."
                }
        }
      
})


export { route }