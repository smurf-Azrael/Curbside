import React from 'react'
import { Link } from 'react-router-dom'
import { Listing } from '../interfaces/Listing'
import ListingPreview from './ListingPreview'
import loader from '../assets/loader.gif';


function CardListings({listings}:{listings:Listing[]}, isLoading:boolean,loadingError:boolean) {
  
  const listings4Display= listings.map(listing => {
    return (<Link key={listing.id} to={`/listing/${listing.id}`} style={{ textDecoration: "none", color: "black" }}>
      <ListingPreview  listing={listing} />
    </Link>)
  })
  return (
    <div className='listings-container'>
      <div>{listings4Display}</div>
      <div>
        {!isLoading && listings.length === 0 && <p>No listing matched your request...</p>}
        {loadingError && <p>Couldn't load listings :/</p>}
        {isLoading && <img style={{ height: '20vw', maxHeight: '200px', borderRadius: '20px' }} src={loader} alt="Loading..." />} 
      </div>
    </div>
  )
}

export default CardListings