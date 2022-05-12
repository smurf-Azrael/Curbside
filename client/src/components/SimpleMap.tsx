import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/ListingDetail.css'
import { mocks } from '../mocks';

const USER_ID = '931d461e-bab4-4c7a-be90-e5e1ab611c0f';
const LISTING_ID = 5;
const mockListing = mocks.listings.filter(listing => listing.userId === USER_ID && listing.id === LISTING_ID)[0];
console.log({mockListing});
console.log(mockListing.longitude)
console.log(mockListing.latitude)

// const position = {lng: mockListing.longitude, lat: mockListing.latitude};
const position = {lng: mockListing.longitude, lat: mockListing.latitude};

const customIcon = new Icon({
  iconUrl: "/icons8-select-24.png",
  iconSize: [17, 17]
})

const SimpleMap = () => {
  return (
    <section className='map-component' >
      <div className='map' id='map' >
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: '200px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={customIcon}/>
      </MapContainer>
      </div>
    </section>
  )
}

export default SimpleMap