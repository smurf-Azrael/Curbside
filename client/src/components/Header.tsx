import React, { useState } from 'react';
import '../styling/Header.scss';
import curbside from './../assets/CurbsideSmall.png';
import { useNavigate } from 'react-router-dom';
import tree from "../assets/tree.gif"
import Modal from 'react-bootstrap/Modal';
import ButtonSmall from './ButtonSmall';
import { useAuth } from '../contexts/AuthContext';

export default function Header({ prevRoute, }: HeaderProps) {
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth();
  const [logOutWindowVisible, setLogOutWindowVisible] = useState(false);
  const [logOutMessageVisible, setLogOutMessageVisible] = useState(false);
  const baseDate = new Date(2022, 4, 17, 10, 21, 32); // May 17, 2022
  const now = new Date();
  let diffInHours = Math.round(Math.abs(baseDate.getTime() - now.getTime()) / (60*60*1000));
  const treesPlanted = 1053 + diffInHours;  

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
        (<p className='treesPlanted'><img src={tree} alt="trees" />{treesPlanted}!</p>) :
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