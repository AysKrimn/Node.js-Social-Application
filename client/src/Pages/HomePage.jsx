import React, { useContext, useEffect, useState } from 'react'

// Components
import TweetCard from '../Components/TweetCard'
import TweetCardAuthor from '../Components/TweetCardAuthor'

import { base_endpoint } from '../API/RequestHandler'

// providers
import { TweetProvider } from '../Context/TweetContext'


export default function HomePage() {

  const [tweetInput, setTweetInput] = useState("")
  const [file, setFile] = useState("")

  const { tweets, setTweets} = useContext(TweetProvider)
  // tweet oluşturma
  const create_tweet = async (event) => {

        event.preventDefault()

        console.log("DOSYA URI:", file)
        const payload = new FormData()
        
        payload.append("tweet", tweetInput)
        // // resmi gönder
        payload.append("attachment", file)

        const request = await fetch(`${base_endpoint}/tweet/create`, {

                method: "post",
                headers: {
                   "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: payload
        })


        const response = await request.json()

        console.log("[TWEET API]:", response)

        if (request.status === 201) {
                
                setTweetInput("")
                setFile("")

                // context güncelle
                setTweets([...tweets, response.data ])
        }
  }


  // tüm tweetleri çek
  const get_all_tweets = async () => {

        const request = await fetch(`${base_endpoint}/tweets`)
        const response = await request.json()

        console.log("ALL TWEET API", response)

        if (request.status === 200) {

                setTweets(response.data)
        }

  }

  useEffect(() => {

        get_all_tweets()

  }, [])

  return (

        <>


            <div className='tweet-submit-container'>

                    <TweetCardAuthor></TweetCardAuthor>


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

                {tweets.map((tweet) => {

                      return <TweetCard key={tweet._id} content = {tweet}></TweetCard>

                })}
            </div>

           
        </>
  )
}
