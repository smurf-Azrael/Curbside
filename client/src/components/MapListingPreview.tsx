import React from 'react'
import { Listing } from '../interfaces/Listing';
import '../styling/MapListingPreview.scss';
import {useNavigate} from 'react-router-dom'



function MapListingPreview({activeListing}: {activeListing:Listing}) {
  const navigate = useNavigate()
  return (
    <button className='Card-Listing-Preview'
    onClick={()=>navigate(`/listing/${activeListing.id}`)}
    >{activeListing.title}</button>
  )
}

export default MapListingPreview