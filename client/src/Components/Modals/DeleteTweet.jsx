import React, { useContext } from 'react'
import { accessToken, base_endpoint } from '../../API/RequestHandler'
import { TweetProvider } from '../../Context/TweetContext'

export default function DeleteTweet(props) {
    


    const { tweets, setTweets } = useContext(TweetProvider)
    const { content } = props

    const call_delete_tweet_api = async () => {

        const onayla = window.confirm("Bu tweeti silmeyi onaylıyor musunuz?")

        if (!onayla) {

            return;
        }

        const request = await fetch(`${base_endpoint}/tweet/${content._id}/delete`, {

            method: "post",
            headers: {
                
                "authorization": accessToken
            }
        })
        const response = await request.json()

        if (request.status === 200) {

            // state güncelle
            const without_target_tweet = tweets.filter(tweet => tweet._id != content._id)
            setTweets(without_target_tweet)
        } else {

            alert("Bir hata meydana geldi lütfen daha sonra tekrar deneyiniz.")

        }

        console.log("DELETE API:", response)
    }
  
  
    return (


        <>
        
            <button onClick={call_delete_tweet_api}  className='btn btn-link text-danger'>Tweet Sil</button>
        
        </>
  )
}
