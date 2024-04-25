import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {

  const yonlendir = useNavigate()

  const navigateToLogin = () => {

    // giriş yapa yönlendir
    yonlendir("/login")

  }

  return (

        <>
        
            <div className='container sign-in-container mt-5'>


                    <form action="" className='w-50'>

                        <h3>Kayıt Ol</h3>
                        <hr />
                        
                        <div className='mb-3'>

                                <label className='w-100'>
                                    E-mail:
                                    <input className='form-control' type="email" placeholder='E-mail Adresi' />
                                </label>

                        </div>

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

                        <div className='mb-3'>

                            <label className='w-100'>
                                Şifre Tekrar:
                                <input className='form-control' type="password" placeholder='Şifrenizi Tekrar Girin' />
                            </label>

                        </div>

                        <div className='options-container'>
                                <div>
                                    <button type='button' className='btn btn-success'>Kayıt Ol</button>
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
