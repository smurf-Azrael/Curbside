import React from 'react'
import { Listing } from '../interfaces/Listing';
import '../styling/MapListingPreview.scss'



function MapListingPreview({activeListing}: {activeListing:Listing}) {
  return (
    <div className='Card-Listing-Preview'>{activeListing.title}</div>
  )
}

export default MapListingPreview