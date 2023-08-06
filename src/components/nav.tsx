import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  return (
    <div className="flex items-center fixed top-0 right-0 h-12 w-screen px-4 z-10">        
        <div className="flex">
          <FontAwesomeIcon icon={faStarOfLife} />
          Focused
        </div>
        <button className="bg-slate-800 justify-center items-center flex h-8 w-16 rounded-lg absolute right-4">Login</button>
    </div>
  )
}

export default NavBar