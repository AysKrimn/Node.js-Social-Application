import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserProvider } from '../../Context/UserContext';
import { accessToken, base_endpoint } from '../../API/RequestHandler';

export default function EditUserPencil() {

  const { user, setUser } = useContext(UserProvider)




  // states
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [passsword, setPassword] = useState("")
  const [password_again, setPasswordAgain] = useState("")
  const [avatar, setAvatar] = useState("")
  const [error, setError] = useState("")


  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {

        window.location.reload()

  };
  const call_update_user_api = async (event) => {

        // reload olmasını önle
        event.preventDefault()

        const payload = new FormData()

        payload.append("username", username)
        payload.append("email", email)
        payload.append("passsword", passsword)
        payload.append("password_again", password_again)
        payload.append("avatar", avatar)

        const request = await fetch(`${base_endpoint}/users/${user.id}/update`, {

             method: "post",
             headers: {

                "authorization": accessToken
             },

             body: payload
        })

       const response = await request.json()

       if ([200, 201].includes(request.status)) {

            alert("user başarılı bir şekilde güncellendi")
            // tokeni güncelle
            localStorage.setItem("token", response.token)
            // mevcut statei güncelle
            // setUser(response.data)
            // modalı kapat
            // handleClose()
            // window.location.reload()
       } else {

            setError(request.data)
       }

       console.log("[UPDATE USER API]:", response)


  }

  return (

    <>
    
    <div className='ms-auto me-2 edit-btn'>
        <svg onClick={handleShow} width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
        </svg>
    </div>

    <Modal show={show} onHide={handleClose}>


                    <Modal.Header closeButton>
                    <Modal.Title>Profilimi Düzenle</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>

                    <form onSubmit={call_update_user_api}>

                    <p className='text-danger m-0 p-0'>{error}</p>
                    
                    <div>
                            <h6>Genel Bilgiler</h6>
                            <hr />

                            <div className='mb-2'>
                                <label htmlFor='username'>Kullanıcı Adınız</label>
                                <input id='username' placeholder='Kullanıcı Adınız' type="text" className='form-control' value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                            </div>

                            <div>
                                <label htmlFor='user-email'>E-mail</label>
                                <input id='user-email' type="email" placeholder='E-mail' className='form-control' value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                    </div>
             


                    <div className='mt-3'>
                            <h6>Şifre & Güvenlik</h6>
                            <hr />

                            <div className='mb-2'>
                                <input placeholder='Parola' type="password" className='form-control' autoComplete="new-password" 
                                        onChange={(e) => setPassword(passsword)}
                                
                                />
                            </div>

                            <div className='mb-2'>
                                <input placeholder='Parola Tekrar' type="password" className='form-control' 
                                        onChange={(e) => setPasswordAgain(password_again)}
                                />
                            </div>
                    </div>
             

                    <div className='mt-3'>
                            <h6>Görünüm</h6>
                            <hr />

                            <div className='mb-2'>
                                <input type='file' className='form-control' 
                                    onChange={(e) => setAvatar(e.target.files[0])}
                                />
                            </div>
                    </div>

                    
                    <Modal.Footer>
     

                    <Button type='submit' variant="success">
                        Değişiklikleri Kaydet
                    </Button>


                    </Modal.Footer>

                    </form>
                    </Modal.Body>

     </Modal>
    </>
  )
}
