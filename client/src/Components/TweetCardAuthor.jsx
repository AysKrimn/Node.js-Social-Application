import React, { useContext } from 'react'
import { UserProvider } from '../Context/UserContext'
import { Link } from 'react-router-dom'


export default function TweetCardAuthor() {

  const { user } = useContext(UserProvider)
  let staticURL = "./defaultAvatar.jpg"

  return (


            <>

                 <div className='tweet-author'>

                    <div className='tweet-avatar'>
                        
                        <img src={staticURL} alt="logo" />

                        {user ? <Link to={`/profile/${user?.username}`}>{user?.username}</Link> : "Anomim" }
                   
                       
                    </div>
                </div>
            </>
  )
}
