import express from 'express'
const route = express.Router()


import check_token from '../ValidateToken/check_token.js'

// user şeması
import UserModel from '../Database/Models/UserModel.js'
import TweetModel from '../Database/Models/TweetModel.js'

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


export { route }