import React, { useState } from 'react'
import UserCard from '../Components/UserCard'
import TweetCard from '../Components/TweetCard'
import { base_endpoint } from '../API/RequestHandler'

export default function HomePage() {


  const [tweetInput, setTweetInput] = useState("")
  const [file, setFile] = useState("")

  const create_tweet = async (event) => {

        event.preventDefault()

        const payload = new FormData()
        
        payload.append("tweet", tweetInput)
        // // resmi gönder
        // payload.append("attachment", file)

        const request = await fetch(`${base_endpoint}/tweet/create`, {

                method: "post",
                headers: {
                   "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(payload)
        })


        const response = await request.json()

        console.log("[TWEET API]:", response)
  }

  return (

        <>

            <div className='tweet-submit-container'>

                    <UserCard></UserCard>


                    <form onSubmit={create_tweet}>

                        <div>

                                <textarea value={tweetInput} onChange={e => setTweetInput(e.target.value)} className='form-control' placeholder='Neler oluyor?'></textarea>
                        </div>

                        <div className='post-container'>

                            <div>
                                    <input onChange={e => setFile(e.target.files[0])} type="file" className='form-control' />
                            </div>

                            <div>
                                    <button className='btn btn-success' type='submit'>Tweetle</button>
                            </div>
                        </div>
                    </form>
            </div>


            <div className='user-feed mt-3'>

                    <TweetCard></TweetCard>
            </div>

           
        </>
  )
}
