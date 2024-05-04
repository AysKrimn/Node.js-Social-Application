import multer from "multer";
// multer multipart/formdata headerini parseler
const tweet_attachment_storage = multer.diskStorage({

    destination: function(request, file, callback) {

            // console.log("DESTİNİATINO FİLE REQ USER::", request.user)
            // const date = new Date()
            // const year = date.getFullYear()

            // let day = date.getDate() + 1
            // if (day < 10) day = `0${day}`
            
            // let month = date.getMonth() + 1
            // if (month < 10) month = `0${month}`

            // const path = `${year}-${day}-${month}`
            // const app_user = request.user.username
            // bu fonksiyon klasör oluşturma davranıışı sergiler
            callback(null, `./public/attachment/`)
            
    
    },


    filename: function(request, file, callback) {

            // bu fonksiyon dosya oluştura davranışı sergiler
            console.log("GELEN DOSYA:", file)
            const randomBisey = Math.floor(Math.random() * 2000)
            callback(null, `attachment-${randomBisey}-${file.originalname}`)
        
    }
})


const tweet_attachment_upload = multer({ storage: tweet_attachment_storage })

export { tweet_attachment_upload }