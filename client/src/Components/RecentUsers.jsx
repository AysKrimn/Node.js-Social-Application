import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { base_endpoint } from '../API/RequestHandler'

export default function RecentUsers() {

    const [newUsers, setNewUsers] = useState([])

    const get_recent_users = async () => {

        const request = await fetch(`${base_endpoint}/recent`)
        const response = await request.json()

        console.log("[RECENT USER API]:", response)

        setNewUsers(response.data)
      
    }

    useEffect(() => {

        // api isteği. 
        get_recent_users()

    }, [])


  return (
    
        <>

            {newUsers.map(user => {

                return <UserCard key = {user._id} recent_user = {user}></UserCard>

            })}
        
   
            
        </>
  )
}
