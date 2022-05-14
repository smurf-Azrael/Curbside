import React from 'react';
import '../styling/Footer.scss';
import { useAuth } from '../contexts/AuthContext';
import FooterLink from './FooterLink';

export default function Footer() {
  const { currentUser } = useAuth();
  return (
    <div className="Footer">
      <FooterLink to="/">
        <i className="bi bi-house"></i>
      </FooterLink>
      <FooterLink to="/chats">
        <i className="bi bi-chat-dots"></i>
      </FooterLink>
      <FooterLink to="/add-listing">
        <i className="bi bi-plus-circle"></i>
      </FooterLink>
      <FooterLink to={`/profile/${currentUser?.id}`}>
        <i className="bi bi-person"></i>
      </FooterLink>
      <FooterLink to="settings">
        <i className="bi bi-gear"></i>
      </FooterLink>
    </div>
  )
}
