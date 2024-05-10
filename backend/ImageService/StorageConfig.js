import multer from "multer";
import fs from 'fs'

// built in functions, libraries

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


// user avatar upload
const user_avatar_storage = multer.diskStorage({

        destination: function(request, file, callback) {
    
                const path = `./public/avatars/${request.user.username}_${request.user.id}/`
                
                // eğer path yoksa oluştur
                fs.mkdir(path, { recursive: true}, (error) => {

                        if (error) {

                                console.log("[CREATE AVATAR MIDDLEWARE] AVATAR OLUŞTURURKEN HATA MEYDANA GELDİ:", error)
                                return
                        }

                })

                callback(null, path)
                
        
        },
    
    
        filename: function(request, file, callback) {
    
                // bu fonksiyon dosya oluştura davranışı sergiler
                console.log("GELEN DOSYA:", file)
                const randomBisey = Math.floor(Math.random() * 2000)
                callback(null, `avatar-${randomBisey}-${file.originalname}`)
            
        }
    })


const tweet_attachment_upload = multer({ storage: tweet_attachment_storage })
const user_avatar_upload = multer({ storage: user_avatar_storage })


export { tweet_attachment_upload, user_avatar_upload }