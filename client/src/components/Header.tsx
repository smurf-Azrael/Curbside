import React from 'react';
import '../styling/Header.scss';
import ButtonSmall from './ButtonSmall';
import curbside from './../assets/CurbsideSmall.png';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';


export default function Header({ prevRoute, }: HeaderProps) {
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth()


  function PrevRoute() {
    return (
      <button
        className='PrevRoute'
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left"></i>
      </button>
    )
  }

  function loggingOut() {
    console.log('youre a genius')
    
    //logOut()
  }

  return (
    <div className='Header'>
      {prevRoute && <PrevRoute />}
      <button className="curbside-home" onClick={() => navigate('/')}>
        <img src={curbside} alt='Curbside' />
      </button>
      {currentUser ?
        (<div className='header-login' onClick={loggingOut} >
          <ButtonSmall content={'Log Out'} fill={false} />
        </div>) :
        (<div className='header-login' onClick={() => navigate('/login')} >
          <ButtonSmall content={'Log in'} fill={true} />
        </div>)
      }

      <Modal show={true}>
        <Modal.Body>
          <p>Hi!!</p>
        </Modal.Body>
      </Modal>

    </div>
  )
}



interface HeaderProps {
  prevRoute?: boolean;
}