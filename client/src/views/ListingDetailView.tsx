// @ts-nocheck
import React from 'react'
import '../styling/ListingDetail.css';
import ButtonSmall from '../components/ButtonSmall';
// import {mocks} from '../mocks';

const ListingDetailView = () => {
  return (
    <section className='listing-detail-container'>
      <section className='listing-owner-info-wrapper'>
        <section className='listing-owner-image-wrapper'>
          img here
        </section>
        <section className='listing-owner-name-buttons-wrapper'>
          <p style={{fontWeight:"bold"}}>Name L.</p>
          <i class="bi bi-heart-fill" style={{fontSize:"1.3rem", color:"gray"}}></i>
        </section>
      </section>
      <ButtonSmall content={'Start a chat to buy'} fill={true} />
      {/* Image section to be added here */}
      <section className='listing-details-data-wrapper'>
        <p style={{fontWeight:"bold"}}>Some cool thing</p>
        <p>Condition:</p>
        <p>Description: </p>
        <p>Location: </p>
      </section>
      {/* Map component goes here */}
    </section>
  )
}

export default ListingDetailView