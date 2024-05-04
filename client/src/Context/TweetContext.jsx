import React, { createContext, useState } from 'react'


export const TweetProvider = createContext()

export default function TweetContext(props) {

  const [tweets, setTweets] = useState([])

  return (

        <>

            <TweetProvider.Provider value={{tweets, setTweets}}>

                    {props.children}
                    
            </TweetProvider.Provider>

        
        </>
  )
}
