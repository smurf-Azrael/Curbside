import React from 'react';
import '../styling/Header.css';
import ButtonSmall from './ButtonSmall';
import { useNavigate } from 'react-router-dom';
import curbside from './../assets/CurbsideSmall.png';
import { useAuth } from '../contexts/AuthContext';
export default function Header() {
  const navigate = useNavigate();
  const {currentUser, logOut} = useAuth()

  return (
    <div className='Header'>
      <div className='header-frame' >
        <button className="curbside-home" onClick={() => navigate('/')}>
          <img src={curbside} alt='Curbside' />
        </button>
        {currentUser ? 
         ( <div className='header-login' onClick={() => logOut()} >
            <ButtonSmall content={'Log Out'} fill={false} />
          </div>) :
        ( <div className='header-login' onClick={() => navigate('/login')} >
        <ButtonSmall content={'Log in'} fill={true} />
        </div>)
        }
      </div>
    </div>
  )
}
