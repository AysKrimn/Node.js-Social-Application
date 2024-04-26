import express from "express"
const server = express()

// built-in middlewara
server.use(express.json())

// env yükle
import 'dotenv/config'
import make_db_connection from "./Database/connect.js"


// APIlar
import { route as AuthenticationAPI } from "./API/Auth.js"


// sunucu yapılandırması
import cors from "cors"
server.use(cors())

//veritabanı bağlantısı
make_db_connection()

// base endpoint
const base_api_url = "/api/v1"

// anasayfaya istek gelirse
server.get('/', (req, res) => {
  res.send('Hello World!')
})

// yan endpointler
server.use(`${base_api_url}/`, AuthenticationAPI) // api/v1/login

const port = process.env["PORT"]

server.listen(port, () => {

  console.log(`Back-end  http://localhost:${port}/ de çalışıyor.`)
})