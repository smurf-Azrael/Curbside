import React from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '../interfaces/Listing';
import ListingPreview from './ListingPreview';
import '../styling/CardListings.scss';


function CardListings({listings , isLoading,loadingError}:{listings:Listing[] , isLoading:boolean,loadingError:boolean}) {
  const listings4Display= listings.map(listing => {
    return (<Link key={listing.id} to={`/listing/${listing.id}`} style={{ textDecoration: "none", color: "#3f3e3e" }}>
      <ListingPreview  listing={listing} />
    </Link>)
  })
  console.log("listings4Display", listings4Display)


  return (
    <div className="CardListings">
      {listings4Display}
      {!isLoading && listings.length === 0 && <p>No listing matched your request...</p>}
      {loadingError && <p>Couldn't load listings :/</p>}
    </div>
  );
}

export default CardListings;
