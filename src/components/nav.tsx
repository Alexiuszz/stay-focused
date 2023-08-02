import React from 'react'

function NavBar() {
  return (
    <div className="flex items-center fixed top-0 right-0 h-16 w-screen px-4">
        <div className="justify-center align-center flex h-6 w-6 bg-cyan-100"></div>
        <button className="bg-slate-800 justify-center items-center flex h-8 w-16 rounded-lg absolute right-4">Login</button>
    </div>
  )
}

export default NavBar