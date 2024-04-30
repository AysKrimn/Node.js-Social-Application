import express from 'express'
const route = express.Router()

// tweet model
import TweetModel from "../Database/Models/TweetModel.js"

// güvenlik mekanizması
import check_token from '../ValidateToken/check_token.js'



// buradan itibaren token kontrolü yapılmaya başlanır
route.use(check_token)
// tweet oluşturma
// FORM DATA BODY DEN GELMIYOR
route.post("/tweet/create", async (request, response) => {

        console.log("REQUESTTEKI USER:", request.user)
        console.log("body:", request.body)
        const { tweet } = request.body

    

        
 
        response.json(`Sen bana ${tweet} diye bişey gönderdin.`)

})



export { route }