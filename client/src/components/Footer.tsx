import React from 'react';
import '../styling/Footer.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Footer() {
const navigate = useNavigate();
const { currentUser } = useAuth();
  return (
    <div className="footer-container">
      <div className="footer-frame">
        <div onClick={() => navigate('/')} className='footer-div-button'>
          <i className="bi bi-house"></i>
        </div>
        <div onClick={() => navigate('/chats')} className='footer-div-button'>
          <i className="bi bi-chat-dots"></i>
        </div>
        <div onClick={() => navigate('/add-listing')} className='footer-div-button'>
          <i className="bi bi-plus-circle"></i>
        </div>
        <div onClick={() => navigate(`/profile/${currentUser?.id}`)} className='footer-div-button'>
          <i className="bi bi-person"></i>
        </div>
        <div onClick={() => navigate('/settings')} className='footer-div-button'>
        <i className="bi bi-gear"></i>
        </div>
      </div>
    </div>
  )
}
