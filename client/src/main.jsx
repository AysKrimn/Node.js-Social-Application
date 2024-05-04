import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Bootsrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Yönlendirme
import { BrowserRouter } from 'react-router-dom';
// User Context
import UserContext from './Context/UserContext.jsx';
// Tweet Context
import TweetContext from './Context/TweetContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

   <BrowserRouter>

      <UserContext>

         
         <TweetContext>
              <App />
         </TweetContext>
 
      </UserContext>
    
   </BrowserRouter>

)
