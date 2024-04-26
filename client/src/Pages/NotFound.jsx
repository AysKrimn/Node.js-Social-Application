import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (

    <>
    
        <div className="container error-container">

            <div className="w-50">

            <p> 
                <Link to="/">Dashboard'a git</Link>
            </p>
            <h2>Aranan Yer Bulunamadı</h2>
            <hr />

            <p>
                Görünen o ki yolunuzu kayıp etmişsiniz. İstenilen sayfa sunucularımız da Bulunamadı
                <br />
                Lütfen bağlantı linkinizi tekrar kontrol edin. 

            </p>


            </div>


        </div>
    
    
    </>
  )
}
