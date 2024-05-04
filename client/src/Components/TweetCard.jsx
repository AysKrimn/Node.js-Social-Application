import React from 'react'
import { base_secondary_endpoint } from '../API/RequestHandler'
import Dropdown from 'react-bootstrap/Dropdown';
import UpdateTweetModal from './Modals/UpdateTweetModal';
import DeleteTweet from './Modals/DeleteTweet';
import { Link } from 'react-router-dom';


export default function TweetCard(props) {

  const { content } = props

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
                 
                    
                        <p>{content.tweet}</p>

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


            <div>

              <svg width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>

</div>


        </div>
    

    </>
  )
}
