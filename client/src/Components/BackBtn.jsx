import React from 'react'
import { Link } from 'react-router-dom'

export default function BackBtn() {
  return (

    <div className='back-container'>

            <Link to="/">
                <svg width={30} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

                Geri Dön
            </Link>
    </div>
  )
}
