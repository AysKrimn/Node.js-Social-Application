import React, { useEffect, useState } from 'react'
import { base_endpoint } from '../API/RequestHandler'
import { useParams } from 'react-router-dom'
import TweetCard from '../Components/TweetCard'
import BackBtn from '../Components/BackBtn'
import Loader from '../Components/Loader'
import CommentCard from '../Components/CommentCard'

export default function TweetDetail() {

  const { tweetId } = useParams()
  const [requestedTweet, setRequestedTweet] = useState({status: "pending", data: null})


  const get_tweet_detail = async () => {


        const request = await fetch(`${base_endpoint}/tweets/${tweetId}`)
        const response = await request.json()

        console.log("[TWEET DETAIL API]:", response)

        if (request.status === 200) {

          setRequestedTweet({ status: "found", data: response.data})
        } else {

          // bir hata meydana  gelmiş
          setRequestedTweet({ status: "not_found", data: response.data } )
        }
      
  }

  useEffect(() => {

      get_tweet_detail()

  }, [])


  const render_layout = () => {


    return <>

      <BackBtn></BackBtn>

      { requestedTweet.status === "not_found" 
      
      
        ? <h4 className='mt-3'>{requestedTweet.data}</h4>

        :
  
        <>
              { requestedTweet.data === null ? <Loader></Loader> :  <TweetCard content = {requestedTweet.data}> </TweetCard> }

              <div className='mt-3'>
                  <h4>Diğer insanların düşünceleri</h4>
                  <hr />

                  {/* yorumlari maple */}


                  {

                      requestedTweet.data !== null && requestedTweet.data.comments.length 
                      
                        ?

                          requestedTweet.data === null ? <Loader></Loader> : requestedTweet.data.comments.map(comment => {

                                  return <CommentCard key={comment._id} content = {comment}></CommentCard>

                          })
                          
                        
                        :  <p className='text-center mt-5'>Henüz kimse düşüncesini paylaşmamış ilk paylaşan sen ol.</p>
                  }
              </div>


        </>
     
      }
    
    </>


  }


  return (

        <>
        
           {render_layout()}
        </>
  )
}
