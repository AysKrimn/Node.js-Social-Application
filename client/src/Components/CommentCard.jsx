import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';

export default function CommentCard(props) {

   // content = comment (yorum)
  const { content } = props



  // moderasyon tool

  const moderation_UI = () => {


  return (

        <>
            <Dropdown>

                  
                   <Link to={`/profile/${content.author.username}`}> {content.author.username} </Link>

                  <Dropdown.Toggle className='moderation-button' variant="link" id="dropdown-basic"> </Dropdown.Toggle>

                  <Dropdown.Menu>
               
                        <Link className='dropdown-item' to="?">Yorum Güncelle</Link>
                        <Link className='dropdown-item' to="?">Yorum Sil</Link>
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
                                    <img src="../defaultAvatar.jpg" alt="avatar" />
                                </div>


                                <div className='tweet-author-details'>


                                    {/* yorum sil, güncelle */}
                                    {moderation_UI()}
                            
                                
                             
                                    <p>{content.comment}</p>
                            
                                

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

                            <div className='tweet-date ms-auto'>
                                    <p className='text-muted'>
                                        <small>{content.createdAt}</small>
                                    </p>
                            </div>

                        </div>




    </div>
    
    </>
  )
}
