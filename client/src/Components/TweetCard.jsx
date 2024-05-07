import React, { useState } from 'react'
import { accessToken, base_endpoint, base_secondary_endpoint } from '../API/RequestHandler'
import Dropdown from 'react-bootstrap/Dropdown';
import UpdateTweetModal from './Modals/UpdateTweetModal';
import DeleteTweet from './Modals/DeleteTweet';
import { Link } from 'react-router-dom';


export default function TweetCard(props) {

  const { content } = props
  const [commentInput, setCommentInput] = useState("")


  const create_comment = async () => {

      const request = await fetch(`${base_endpoint}/tweets/${content._id}/create/comment`, {

          method: "post",
          headers: {

              "content-type": "application/json",
              "authorization": accessToken
          },

          body: JSON.stringify({

              user_comment: commentInput

          })
      })

      const response = await request.json()

      if (request.status === 201) {

          alert(response.message)
      } else {

          alert(response.data)
      }

      console.log("COMMENT API:", response)
  }


  const moderation_UI = () => {


    return (

        <>
            <Dropdown>

                  
                   <Link to={`/profile/${content.author.username}`}> {content.author.username} </Link>

                  <Dropdown.Toggle className='moderation-button' variant="link" id="dropdown-basic"> </Dropdown.Toggle>

                  <Dropdown.Menu>
               
                        <UpdateTweetModal content = {content}></UpdateTweetModal>  
                        <DeleteTweet content = {content}></DeleteTweet>
                  </Dropdown.Menu>
            </Dropdown>
        
        </>
    )

  }

  return (


    <>
    
        <div className="general-tweet-card-container mb-3">

        
            <div className="tweet-author">

                    {/* foto */}
                    <div className='tweet-author-avatar'>
                        <img src="./defaultAvatar.jpg" alt="avatar" />
                    </div>


                    <div className='tweet-author-details'>

       
            
                        {moderation_UI()}
                 
                    
                        <Link className='to_post' to={`/tweets/${content._id}`}>
                            <p>{content.tweet}</p>
                        </Link>
                       

                        {
                            content.attachment 
                            ? 
                            
                            <>
                                <div className='tweet-attachment-container'>
                                  <img src={`${base_secondary_endpoint}/${content.attachment}`} alt="tweet-post-attachment" />
                                </div>
                            </>

                            : null
                        }
                    </div>
            </div>


            <div className='tweet-bottom-container'>

                  <div className='tweet-buttons'>
                        <svg width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>

                        <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M14.47 2.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H9a5.25 5.25 0 1 0 0 10.5h3a.75.75 0 0 1 0 1.5H9a6.75 6.75 0 0 1 0-13.5h10.19l-4.72-4.72a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>  

                        <span> ({content.comments.length})</span>
                  </div>

                  <div className='tweet-date'>
                        <p className='text-muted'>
                            <small>{content.createdAt}</small>
                        </p>
                  </div>

              </div>

            
              <div className='tweet-reply-container'> 

                      <div className='comment-box-wrapper'>
                        
                            <div className='comment-box'>

                        
                                  <textarea onChange={(e) => setCommentInput(e.target.value)} value={commentInput} className='form-control' placeholder="Düşüncelerini Paylaş"></textarea>
                            </div>

                            <div>

                                {/* burası forma bağlanacak */}
                                <button className='btn text-primary me-2' type='submit' onClick={create_comment}>

                                        <svg width={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                        </svg>

                                  </button>
                            
                            </div>

              
                      </div>

              </div>

        </div>
    

    </>
  )
}
