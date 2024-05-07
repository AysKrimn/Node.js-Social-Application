import express from "express"
// router
const route = express.Router()

// yorum modelini çek
import TweetCommentModel from "../Database/Models/TweetCommentModel.js"
import TweetModel from "../Database/Models/TweetModel.js"
// token kontrolü
import check_token from "../ValidateToken/check_token.js"


// tweet gönderisine yorum yapma API
route.post("/tweets/:tweetId/create/comment", check_token, async (request, response) => {

    const tweetId = request.params.tweetId
    const authorId = request.user.id

    const { user_comment } = request.body

    if (!user_comment) {

        return response.status(400).json({ data: "Boş yorum yapamazsın."})
    }

    try {
    
        const tweet = await TweetModel.findOne({ _id: tweetId})

        if (tweet === null) {

            return response.status(404).json({ data: "Böyle bir tweet bulunamadı."})
        }

        // model 
        // yeni yorum oluştur
        const new_comment = await TweetCommentModel.create({ author: authorId, tweet: tweet._id, comment: user_comment})
        await new_comment.save()

        // oluşturulan yorumu, yorum yapılan gönderiye ata (ilişkilendir)
        tweet.comments.push(new_comment._id)
        // gönderiyi de kaydet
        await tweet.save()

        return response.status(201).json({ target_tweet: tweet, data: new_comment, message: "Başarılı bir şekilde yanıtınız gönderildi." })


    } catch (error) {
        
        console.log("[CREATE COMMENT API] ERROR:", error)
        response.status(500).json({ data: "Geçici bir sorun yaşıyoruz lütfen daha sonra tekrar dene."})

    }

    

})











export { route }