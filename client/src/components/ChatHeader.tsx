import React from 'react';
import '../styling/Header.scss';
import ButtonSmall from './ButtonSmall';
import curbside from './../assets/CurbsideSmall.png';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ChatHeader({listing}: HeaderProps) {
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
    <div className='Header ChatHeader'>
      <PrevRoute />
      <img src={listing.photoUrl} alt={listing.title} />
      
    </div>
  )
}



interface HeaderProps {
  listing:  ListingPreview
}

interface ListingPreview {
  id: string;
  title: string;
  photoUrl?: string;
  listingStatus: string;
  priceInCents: number;
}