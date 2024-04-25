import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {

  const yonlendir = useNavigate()

  const navigateToRegister = () => {

        
    yonlendir("/register")
  }


  return (

        <>
        
            <div className='container sign-in-container mt-5'>


                    <form action="" className='w-50'>

                        <h3>Giriş Yap</h3>
                        <hr />
                        
                        <div className='mb-3'>

                            <label className='w-100'>
                                Kullanıcı Adı:
                                <input className='form-control' type="text" placeholder='Kullanıcı Adınız' />
                            </label>

                        </div>

                        <div className='mb-3'>

                         <label className='w-100'>
                                Şifre:
                                <input className='form-control' type="password" placeholder='Şifreniz' />
                         </label>
                        
                        </div>

                        <div className='options-container'>
                                <div>
                                    <button className='btn btn-success'>Giriş Yap</button>
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
