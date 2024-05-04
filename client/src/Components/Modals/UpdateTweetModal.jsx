import React, { useContext } from 'react'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { accessToken, base_endpoint } from '../../API/RequestHandler';
import { TweetProvider } from '../../Context/TweetContext';


export default function UpdateTweetModal(props) {

  // tweet provider
  const {tweets, setTweets} = useContext(TweetProvider)
  const [error, setError] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newTweetInput, setNewTweetInput] = useState("")
  const { content } = props

  const title = `${content.author.username} adlı kullanıcının tweet'i`

  // api
  const updateTweet = async (event) => {

        event.preventDefault()
    
        const request = await fetch(`${base_endpoint}/tweet/${content._id}/update`, {

            method: "post",
            headers: {
                "content-type": "application/json",
                "authorization": accessToken
            },

            body: JSON.stringify({

                newContent: newTweetInput
            })
        })

        const response = await request.json()

        if (request.status === 201) {

            // state güncelle
            const tweetInstances = tweets.filter(data => data)
            let targetTweet = tweetInstances.find(data => data._id === content._id)

            targetTweet.tweet = newTweetInput

            // state güncelle
            setTweets(tweetInstances)
            // stateleri bosalt
            setNewTweetInput("")
            setError("")
            // modalı kapat.
            handleClose()

        } else {

            // error state güncelel
            setError(response.data)
        }

        console.log("TWEET UPDATE API:", response)
  }

  return (

            <>
            
            <Button className='p-0 btn btn-link dropdown-item' onClick={handleShow}>
                   Tweet Güncelle
            </Button>

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>

                   

                    <Modal.Body>

                        <form onSubmit={(e) => updateTweet(e)}>
                                <p className='text-danger'>{error}</p>
                                <div className="mb-3">
                                    <textarea value={newTweetInput} onChange={e => setNewTweetInput(e.target.value)} placeholder={content.tweet} className='form-control'></textarea>
                                </div>

                                <div>

                                    <input type="file" className='form-control' />
                                </div>

                          
                            
                            <Modal.Footer>

                                    <Button type='submit' variant="success">
                                        Güncelle
                                    </Button>
                                 
                            </Modal.Footer>
                            
                        </form>

                    </Modal.Body>
            </Modal>
            
            </>
  )
}
