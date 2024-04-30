import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserProvider } from '../Context/UserContext'

export default function UserCard(props) {

 const { user, setUser } = useContext(UserProvider)
 const { recent_user } = props

 let staticURL = ""

 const path = useLocation()

 if (path.pathname === "/") {

     staticURL = "./defaultAvatar.jpg"

 } else {

     staticURL = "../defaultAvatar.jpg"
 }


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

                        <Link to={`/profile/${model?.username}`}>{model?.username}</Link>
                    </div>
            </div>

        </div>

    )}

  return (

        <>
           
                {layout()}
        </>
  )
}
