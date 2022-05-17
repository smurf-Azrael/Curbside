import React, { useState } from 'react';
import '../styling/Header.scss';
import ButtonSmall from './ButtonSmall';
import curbside from './../assets/CurbsideSmall.png';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

export default function Header({ prevRoute, }: HeaderProps) {
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth();
  const [logOutWindowVisible, setLogOutWindowVisible] = useState(false);
  const [logOutMessageVisible, setLogOutMessageVisible] = useState(false);
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

  function closeLogOutWindow() {
    setLogOutWindowVisible(false)
  };
  function logOutWindow() {
    setLogOutWindowVisible(true)
  }
  function loggingOut() {
    setLogOutMessageVisible(true)
    setTimeout(() => {
      logOut()
      closeLogOutWindow();
      setTimeout(() => { setLogOutMessageVisible(false) }, 500)
    }, 1200)
  }

  return (
    <div className='Header'>
      {prevRoute && <PrevRoute />}
      <button className="curbside-home" onClick={() => navigate('/')}>
        <img src={curbside} alt='Curbside' />
      </button>
      {currentUser ?
        (<div className='header-login' onClick={logOutWindow} >
          <ButtonSmall content={'Log Out'} fill={false} />
        </div>) :
        (<div className='header-login' onClick={() => navigate('/login')} >
          <ButtonSmall content={'Log in'} fill={true} />
        </div>)
      }

      <Modal show={logOutWindowVisible} onHide={closeLogOutWindow} >
        <Modal.Header closeButton>Logging out</Modal.Header>
        <Modal.Body>
          <div className={`log-out-box ${logOutMessageVisible && 'hide-div'}`} >
            <p>Do you really want to log out?</p>
            <div className='log-out-btn-group' >
              <div onClick={loggingOut} >
                <ButtonSmall content={'log out'} fill={true} />
              </div>
              <div onClick={closeLogOutWindow}>
                <ButtonSmall content={'Cancel'} fill={false} />
              </div>
            </div>
          </div>
          <div className={`log-out-box ${!logOutMessageVisible && 'hide-div'}`}>
            <p>See you very soon!</p>
          </div>

        </Modal.Body>
      </Modal>

    </div>
  )
}



interface HeaderProps {
  prevRoute?: boolean;
}