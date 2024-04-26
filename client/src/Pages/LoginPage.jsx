import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { base_endpoint } from '../API/RequestHandler'
import { UserProvider } from '../Context/UserContext'


export default function LoginPage() {

  // context 
  const { setUser } = useContext(UserProvider)
  // states
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const yonlendir = useNavigate()

  const call_login_api = async (event) => {
        
        event.preventDefault()

        const request = await fetch(`${base_endpoint}/login`, {

            method: "post",
            headers: {
                "content-type": "application/json"
            },

            body: JSON.stringify({

                username,
                password
            })
        })

        const response = await request.json()


        if (request.status != 200) {

            setError(response.data)
        } else {

            // user güncelle
            setUser(response.user)
            // logni yap
            yonlendir("/")

        }
        console.log("LOGİN APİ:", response)
  }

  const navigateToRegister = () => {

        
    yonlendir("/register")
  }


  return (

        <>
        
            <div className='container sign-in-container mt-5'>


                    <form action="" className='w-50' onSubmit={call_login_api}>

                        <h3>Giriş Yap</h3>
                        <hr />
                        
                        <p className='text-danger'>{error}</p>

                        <div className='mb-3'>

                            <label className='w-100'>
                                Kullanıcı Adı:
                                <input className='form-control' type="text" placeholder='Kullanıcı Adınız'
                                
                                    onChange={(e) => setUsername(e.target.value)} value={username}
                                />

                            </label>

                        </div>

                        <div className='mb-3'>

                         <label className='w-100'>
                                Şifre:
                                <input className='form-control' type="password" placeholder='Şifreniz' 
                                
                                    onChange={(e) => setPassword(e.target.value)} value={password}
                                
                                />
                         </label>
                        
                        </div>

                        <div className='options-container'>
                                <div>
                                    <button type='submit' className='btn btn-success'>Giriş Yap</button>
                                </div>

                                <div className='text-center'>
                                    <p>veya</p>
                                </div>
                                <div className='mt-1'>
                                    <button onClick={navigateToRegister} className='btn btn-primary'>Kayıt Ol</button>
                                </div>
                        </div>
                    </form>


            </div>
        
        </>
  )
}
