import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { UserProvider } from '../Context/UserContext'

export default function UserCard() {

 const { user, setUser } = useContext(UserProvider)


 let staticURL = ""

 const path = useLocation()

 if (path.pathname === "/") {

     staticURL = "./defaultAvatar.jpg"

 } else {

     staticURL = "../defaultAvatar.jpg"
 }


  return (

        <>
                    <div className="tweet-container">

                            <div className='tweet-author'>

                                    <div className='tweet-avatar'>
                                        
                                        <img src={staticURL} alt="logo" />

                                        <a href="?">{user?.username || "Tester"}</a>
                                    </div>
                            </div>

                    </div>
        
        </>
  )
}
