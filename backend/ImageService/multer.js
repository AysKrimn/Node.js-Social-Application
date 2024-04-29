import multer from "multer";


const storage = multer.diskStorage({

    destination: function(request, file, cb) {

        return cb(null, "./public/attachments/")
    },

    filename: function(request, file, cb) {

        return cb(null, "test-" + file.originalname)
    }
})


export const tweet_attachment_upload = multer({ storage })