import React from 'react'
import { Outlet } from 'react-router-dom'
import UserCard from '../Components/UserCard'

export default function MainLayout() {
  return (

        <>
        
            <div className="container-fluid mt-5 p-2">


                    <div className="row">


                            {/* Profile Banner vs */}
                            <div className="col-3 text-center">
                                
                                <h4>Profiliniz</h4>
                                <hr />


                                <UserCard></UserCard>

                            </div>
                            
                            {/* ana akış */}
                            <div className="col-6">

                                    <Outlet></Outlet>
                            </div>

                            {/* Yeni Kayıt Olan Üyeler */}
                            <div className="col-3 text-center">
                                
                                <h4>Topluluğa Yeni Katılanlar</h4>
                                <hr />

                                <UserCard></UserCard>

                            </div>

                    </div>


            </div>
        
        </>
  )
}
