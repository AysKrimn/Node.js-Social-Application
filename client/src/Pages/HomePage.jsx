import React from 'react'
import UserCard from '../Components/UserCard'
import TweetCard from '../Components/TweetCard'

export default function HomePage() {
  return (

        <>

            <div className='tweet-submit-container'>

                    <UserCard></UserCard>


                    <form action="">

                        <div>

                                <textarea className='form-control' placeholder='Neler oluyor?'></textarea>
                        </div>

                        <div className='post-container'>

                            <div>
                                    <input type="file" className='form-control' />
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
