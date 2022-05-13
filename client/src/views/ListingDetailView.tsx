//@ts-nocheck
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useApi } from "../contexts/ApiProvider";
import '../styling/ListingDetail.css';
import ButtonWide from '../components/ButtonWide';
import SimpleMap from '../components/SimpleMap';
import ImageCarousel from '../components/ImageCarousel';
import { useAuth } from '../contexts/AuthContext';
import AppBody from '../components/AppBody';
// import { Listing } from '../interfaces/Listing';

const ListingDetailView = () => {
  // Need to add heart button functionality
  const [listing, setListing] = useState();
  const api = useApi();
  const { currentUser } = useAuth();
  const {id} = useParams();

  useEffect(() => {
    const loadListingData = async () => {
      const res = await api.get(`/listings/${id}`);
      if (res.ok) {
        console.log(res.body.data.listing)
        setListing(res.body.data.listing);
      } else {
        console.log('failing to load listing data');
        // handleErrors
      }
    };
    loadListingData();
  },[api, id])

  return listing !== undefined ? (
    <AppBody>
      <section className='listing-detail-container'>
        <section className='listing-owner-info-wrapper'>
          <section className='listing-owner-image-wrapper'>
            <img src={listing.userPhotoUrl} alt={'user'} />
          </section>
          <section className='listing-owner-name-buttons-wrapper'>
            <p className='listing-owner-name'>{`${listing.userFirstName} ${listing.userLastName.slice(0,1)}.`}</p>
          </section>
        </section>
          {currentUser && listing.userId !== currentUser.id ? (<section className='listing-button-wrapper'>
            <Link to={`/listing/${id}/chat`} >
              <ButtonWide content={'Start a chat to buy'} fill={true} />
            </Link>
          </section>) : '' }
        <section className='listing-details-gallery-wrapper'>
          <ImageCarousel carouselItems={listing.photoUrls} />
        </section>
        <section className='listing-details-data-wrapper'>
          <div className='price-favorite-button-wrapper'>
            <h4 style={{fontWeight:"bold", fontSize:"2rem"}}>{`${(listing.priceInCents / 100).toLocaleString('en-US')} ${listing.currency.toUpperCase()}`}</h4>
            <i className="bi bi-heart-fill" style={{fontSize:"1.9rem", color:"gray"}}></i>
          </div>
          <h4 style={{fontWeight:"bold"}}>{listing.title}</h4>
          <p><span style={{fontWeight:"bold", color:"gray"}}>Condition:</span>{listing.condition === 'gentlyUsed' ? 'gently used': listing.condition}</p>
          <p><span style={{fontWeight:"bold", color:"gray"}}>Description: </span>{listing.description}</p>
          <p style={{fontWeight:"bold", color:"gray"}}>Location: </p>
        </section>
        <SimpleMap position={{lng: listing.longitude, lat: listing.latitude}} />
      </section>
    </AppBody>
  ) : (
    <></>
  )
}

export default ListingDetailView