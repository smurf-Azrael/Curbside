import {useEffect, useState, useRef} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/MapListings.scss'
import { Listing } from '../interfaces/Listing';
import MarkerClusterGroup from "react-leaflet-cluster";

const customIcon = new Icon({
  iconUrl: "/icons8-select-24.png",
  iconSize: [17, 17]
})

const MapListings = ({listings}:{listings:Listing[]}) => {
  const [activeListing, setActiveListing] = useState<Listing | null>(null)
  
  const listingMarkers = listings.map(listing=>{
    let markerPosition  : {lat: number, lng: number} = {lat: listing.latitude, lng: listing.longitude}
    return <Marker 
      position={markerPosition} 
      icon={customIcon} 
      key={listing.id}
      eventHandlers={{
        click: (e) => {
          console.log('marker clicked', e)
          setActiveListing(listing)
        },
      }}
      />
  })

  const {userPosition} : {userPosition: {lat: number, lng: number} }= {userPosition: {lat: 52.5200, lng: 13.4050 }}
  return (
    <section className='SimpleMap' >
      <MapContainer
        center={userPosition}
        zoom={9}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MarkerClusterGroup>
        {listingMarkers}
        </MarkerClusterGroup>
        {activeListing && (
          <Popup
            className = "PopupContainer"
            position={[
              activeListing.latitude,
              activeListing.longitude
            ]}
          >
            <div>
              <h2>{activeListing.title}</h2>
              <img className="PopupImage" src={activeListing.photoUrls[0]} alt="Popup"/>
            </div>
          </Popup>
        )}
      </MapContainer>
    </section>
  )
}

export default MapListings