import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  return (
    <div className="flex items-center fixed top-0 right-0 h-12 w-screen px-4 z-10">        
        <div className="flex w-20 justify-between">
          <FontAwesomeIcon icon={faStarOfLife} /> 
          <span>Focused</span>
        </div>
    </div>
  )
}

export default NavBar