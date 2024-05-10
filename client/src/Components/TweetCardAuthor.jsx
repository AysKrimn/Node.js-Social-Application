import React, { useContext } from 'react'
import { UserProvider } from '../Context/UserContext'
import { Link } from 'react-router-dom'
import { base_secondary_endpoint } from '../API/RequestHandler'


export default function TweetCardAuthor() {

  const { user } = useContext(UserProvider)

  let avatarURL = "./defaultAvatar.jpg"

  if (user !== null) {

        avatarURL = `${base_secondary_endpoint}${user.avatar}`
  }


  return (


            <>

                 <div className='tweet-author'>

                    <div className='tweet-avatar'>
                        
                        <img src={avatarURL} alt="logo" />

                        {user ? <Link to={`/profile/${user?.username}`}>{user?.username}</Link> : "Anomim" }
                   
                       
                    </div>
                </div>
            </>
  )
}
