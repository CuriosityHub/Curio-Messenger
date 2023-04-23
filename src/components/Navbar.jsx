import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className='logo'>
        <img src='./img/logoPng.png' alt='logo' className='logoPng' />
      </span>
      <div className='user'>
        <img src={currentUser.photoURL} alt='img' />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar