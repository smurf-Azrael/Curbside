import React from 'react';
import '../styling/Header.scss';
import ButtonSmall from './ButtonSmall';
import curbside from './../assets/CurbsideSmall.png';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header({ prevRoute, }: HeaderProps) {
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth()


  function PrevRoute() {
    return ( 
      <button 
        className='PrevRoute'
        onClick={()=> navigate(-1)}
      >
        <i className="bi bi-arrow-left"></i>
      </button> 
    )
  }
  return (
    <div className='Header'>
      {prevRoute && <PrevRoute /> }
      <button className="curbside-home" onClick={() => navigate('/')}>
        <img src={curbside} alt='Curbside' />
      </button>
      {currentUser ?
        (<div className='header-login' onClick={() => logOut()} >
          <ButtonSmall content={'Log Out'} fill={false} />
        </div>) :
        (<div className='header-login' onClick={() => navigate('/login')} >
          <ButtonSmall content={'Log in'} fill={true} />
        </div>)
      }
    </div>
  )
}



interface HeaderProps {
  prevRoute?: boolean;
}