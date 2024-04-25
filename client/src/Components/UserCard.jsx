import React from 'react'
import { useLocation } from 'react-router-dom'

export default function UserCard() {

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

                                        <a href="?">Tester</a>
                                    </div>
                            </div>

                    </div>
        
        </>
  )
}
