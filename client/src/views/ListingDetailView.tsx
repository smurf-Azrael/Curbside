// @ts-nocheck
import React from 'react'
import '../styling/ListingDetail.css';
import ButtonSmall from '../components/ButtonSmall';
import SimpleMap from '../components/SimpleMap';

// --- setup for mock data
import { mocks } from '../mocks';
const USER_ID = '931d461e-bab4-4c7a-be90-e5e1ab611c0f';
const LISTING_ID = 5;
const mockListing = mocks.listings.filter(listing => listing.userId === USER_ID && listing.id === LISTING_ID)[0];
console.log({mockListing})
console.log(typeof mockListing.longitude);
// ---

const position = {
  lng: mockListing.longitude,
  lat: mockListing.latitude
};
console.log('position in ListingDetailView component', position)


const ListingDetailView = () => {
  return (
    <section className='listing-detail-container'>
      <section className='listing-owner-info-wrapper'>
        <section className='listing-owner-image-wrapper'>
          img here
        </section>
        <section className='listing-owner-name-buttons-wrapper'>
          <p style={{fontWeight:"bold"}}>Name L.</p>
          <i className="bi bi-heart-fill" style={{fontSize:"1.3rem", color:"gray"}}></i>
        </section>
      </section>
      <ButtonSmall content={'Start a chat to buy'} fill={true} />
      {/* Image section to be added here */}
      <section className='listing-details-data-wrapper'>
        <p style={{fontWeight:"bold"}}></p>
        <p>Condition:</p>
        <p>Description: </p>
        <p>Location: </p>
      </section>
      <SimpleMap position={position} />
    </section>
  )
}

export default ListingDetailView