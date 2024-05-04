import React, { useEffect, useState } from 'react'
import UserCard from '../Components/UserCard'
import BackBtn from '../Components/BackBtn'
import { useParams } from 'react-router-dom'
import Loader from '../Components/Loader'
import { base_endpoint } from '../API/RequestHandler'
import TweetCard from '../Components/TweetCard'

export default function ProfilePage() {

  const { username } = useParams()
  const [targetUser, setTargetUser] = useState({ status: null})
  const [targetTweets, setTargetTweets] = useState([])


  const get_user_profile = async () => {
  
        const request = await fetch(`${base_endpoint}/users/${username}`)
        const response = await request.json()

        if (request.status === 200) {

            setTargetUser({ status: true, data: response.data})
         
        
        } else {

          setTargetUser({ status: false, data: response.data })
        }

        console.log("USER DETAİL API:", response)
  }

  useEffect(() => {

      get_user_profile()

  }, [username])




  const render_layout = () => {

    if (targetUser.status === null) {

        return <Loader></Loader>
    }


    if (targetUser.status === false) {

        return `${targetUser.data}`
    }



    if (targetUser.status === true) {

        return <UserCard main = {true}></UserCard>
    }


  }



  const render_tweet_layout = () => {


    if (targetUser.status === null) {

        return <Loader></Loader>
    }
    
    if (targetUser.status === false) {

      return `Gösterilecek Birşey Yok`
    }


    return <>
    
        <h3 style={{textTransform:"capitalize"}}>{targetUser.data.profile.username} Adlı Kullanınıcın En Son Gönderdiği Tweetler</h3>
        <hr />

        {targetUser.data.post_tweets.map((tweet) => {


            return <TweetCard content = {tweet}></TweetCard>

        })}
    
    </>

  }




  return (
    
    <>

          <BackBtn></BackBtn>
    
         <div className='user-profile-container'>

                {render_layout()}
         </div>
     
        <div className='mt-3'>
        
            {render_tweet_layout()}

        </div>
    
    
    </>
  )
}
