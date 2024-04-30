// güvenlik mekanizması
import jwt from "jsonwebtoken"

const check_token = (request, response, next) => {

    console.log("GELEN HEADER:", request.headers)
    const token_header = request.headers["authorization"]

    if  (!token_header) {

        return response.status(401).json({ data: "Token Gerekli"})
    }

    const token = token_header.split(" ")[1]

    jwt.verify(token, process.env["JWT_SECRET"], function(error, decodedUser) {


        if (error) {

            return response.status(403).json({ data: "Geçersiz Tokenden dolayı erişim reddedildi"})
        }


        request.user = decodedUser
        next()

    })
}




export default check_token