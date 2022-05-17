import React from 'react'
import { Listing } from '../interfaces/Listing';
import { Link } from 'react-router-dom'
import '../styling/MapListingPreview.scss';



function MapListingPreview({ activeListing }: { activeListing: Listing }) {

  const price = (activeListing.priceInCents / 100).toLocaleString('en-US', { style: 'currency', currency: 'EUR' });


  return (
    <Link className='Card-Listing-Preview' to={`/listing/${activeListing.id}`}>
      <img className='Preview-Img' src={activeListing.photoUrls[0]}></img>
      <div className='Preview-Text-Content'>
        <h6 className='Preview-Title'>
          {activeListing.title}
        </h6>
        <div className='Preview-Price-Listing-Container'>
          <div className='Preview-Price'>
            {price}
          </div>
          <div className='Preview-Rating'>
            {activeListing.rating ? activeListing.rating : "New"}
            <i className="bi bi-star-fill"></i>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MapListingPreview