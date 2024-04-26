import mongoose from "mongoose"


const make_db_connection = async () => {

    try {

        await mongoose.connect(process.env["DB_URI"])

        console.log("Sunucu veritabanına başarılı bir şekilde bağlandı.")
        
    } catch (error) {

        console.log("Veritabanına bağlanırken bir hata meydana geldi.", error)
        
    }



}



export default make_db_connection