import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserProvider } from '../Context/UserContext'

export default function UserCard(props) {

 const { user, setUser } = useContext(UserProvider)
 const { recent_user, main } = props


 // eğer user login değilse
 if (user === null && !main) {

    return (

            <>
            
                <div>
                    <p>
                       Profil işlemleri için lütfen <Link to="/login">Giriş Yapın</Link>
                    </p> 
                  
                </div>
            </>

    )

 }

 let staticURL = ""

 const path = useLocation()

 if (path.pathname === "/") {

     staticURL = "./defaultAvatar.jpg"

 } else {

     staticURL = "../defaultAvatar.jpg"
 }


  // çıkış yap
  const handleLogout = (event) => {

    event.preventDefault()
    localStorage.removeItem("token")
    
    window.location.href = "/"

  }

  // ui işlemleri
  const layout = () => {

    let model = null
    let initialClass = "tweet-container"

    if (recent_user) {

        model = recent_user
        initialClass += " mb-2"

    } else {

        model = user
    }

    return ( 
    
        <div className={initialClass}>

            <div className='tweet-author'>

                    <div className='tweet-avatar'>
                        
                        <img src={staticURL} alt="logo" />

                        {user ? <Link to={`/profile/${model?.username}`}>{model?.username}</Link> : "Anomim" }
                   
                    </div>
            </div>


            {

                !main && !recent_user && user !== null ? 
                
                <div className='user-logout-container'>
                    <Link onClick={handleLogout}>Çıkış Yap</Link>
                </div> 
                
                : null
            }

        </div>

    )}

  return (

        <>
           
                {layout()}
        </>
  )
}
