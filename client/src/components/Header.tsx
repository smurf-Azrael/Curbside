import React from 'react';
import '../styling/Header.css';
import ButtonSmall from './ButtonSmall';
import { useNavigate } from 'react-router-dom';
import curbside from './../assets/CurbsideSmall.png';
import { useAuth } from '../contexts/AuthContext';
export default function Header() {
  const navigate = useNavigate();
  const currentUser = useAuth()

  return (
    <div className='header-container'>
      <div className='header-frame' >
        <button className="curbside-home" onClick={() => navigate('/')}>
          <img src={curbside} alt='Curbside' />
        </button>
        <div className='header-login' onClick={() => navigate('/login')} >
          <ButtonSmall content={currentUser ? 'Log Out': 'Log in'} fill={true} />
        </div>
      </div>

    </div>
  )
}
