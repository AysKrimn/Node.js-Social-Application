import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { base_endpoint } from '../API/RequestHandler'

export default function RegisterPage() {

  // states
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const yonlendir = useNavigate()

  const call_register_api = async (event) => {

    event.preventDefault()

    const request = await fetch(`${base_endpoint}/register`, {

        method: "post",
        headers: {

            "content-type": "application/json"
        },

        body: JSON.stringify({

                email, 
                username,
                password,
                password2
        })
    })

    const response = await request.json()


    if (request.status === 201) {

        navigateToLogin()

    } else if (request.status === 400) {


        setError(response.data)
    }

    console.log("REGİSTER API:", response)


  }

  const navigateToLogin = () => {

    // giriş yapa yönlendir
    yonlendir("/login")

  }

  return (

        <>
        
            <div className='container sign-in-container mt-5'>


                    <form action="" className='w-50' onSubmit={call_register_api}>

                        <h3>Kayıt Ol</h3>
                        <hr />
                        
                        <p className='text-danger'>{error}</p>
                        <div className='mb-3'>

                                <label className='w-100'>
                                    E-mail:
                                    <input className='form-control' type="email" placeholder='E-mail Adresi' 
                                        onChange={(e) => setEmail(e.target.value)} value={email}
                                    />
                                </label>

                        </div>

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

                        <div className='mb-3'>

                            <label className='w-100'>
                                Şifre Tekrar:
                                <input className='form-control' type="password" placeholder='Şifrenizi Tekrar Girin' 
                                
                                    onChange={(e) => setPassword2(e.target.value)} value={password2}
                                
                                />
                            </label>

                        </div>

                        <div className='options-container'>
                                <div>
                                    <button type='submit' className='btn btn-success'>Kayıt Ol</button>
                                </div>

                                <div className='text-center'>
                                    <p>veya</p>
                                </div>
                                <div className='mt-1'>
                                    <button onClick={navigateToLogin} type='button' className='btn btn-primary'>Giriş Yap</button>
                                </div>
                        </div>
                    </form>


            </div>
        
        </>
  )
}
