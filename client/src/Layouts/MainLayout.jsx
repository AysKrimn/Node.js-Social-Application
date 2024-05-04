import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import UserCard from '../Components/UserCard'
import { base_endpoint } from '../API/RequestHandler'
import Loader from '../Components/Loader'

import { UserProvider } from '../Context/UserContext'
import RecentUsers from '../Components/RecentUsers'

export default function MainLayout() {

    const [loader, setLoader] = useState(true)
    const { setUser } = useContext(UserProvider)

    const get_user_information = async () => {

        const token = localStorage.getItem("token")

        if (token) {

                const request = await fetch(`${base_endpoint}/verify/token`, {

                    method: "post",
                    headers: { "content-type": "application/json"},
                    body: JSON.stringify({token})
                })

                const response = await request.json()

                console.log("[LOGIN API]:", response)

                if (request.status === 200) {

                    setUser(response.data)
                }

        }

        // loaderi kaldır
        setLoader(false)
    }

    useEffect(() => {

        get_user_information()

    }, [])
    
  return (

        <>
        
            <div className="container-fluid mt-5 p-2">


                    <div className="row">


                            {/* Profile Banner vs */}
                            <div className="col-3 text-center left-side">
                                
                              <div className='short-profile-container'>

                                <h4>Profiliniz</h4>
                                <hr />

                                { loader ? <Loader></Loader> : <UserCard></UserCard> }
                         
                             </div>
                            </div>
                            
                            {/* ana akış */}
                            <div className="col-6">

                            { loader ? <Loader></Loader> : <Outlet></Outlet> }
                            </div>

                            {/* Yeni Kayıt Olan Üyeler */}
                            <div className="col-3 text-center right-side">
                                
                             <div className='recent-user-container'>
                                    <h4>Topluluğa Yeni Katılanlar</h4>
                                    <hr />

                                    { loader ? <Loader></Loader> : <RecentUsers></RecentUsers> }

                            </div>
                            
                            </div>

                    </div>


            </div>
        
        </>
  )
}
