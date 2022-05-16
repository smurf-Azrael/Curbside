import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/SimpleMap.scss'

const customIcon = new Icon({
  iconUrl: "/icons8-select-24.png",
  iconSize: [17, 17]
})


const MapListings = () => {


  const {position} : {position: {lat: number, lng: number} }= {position: {lat: 52.5200, lng: 13.4050 }}
  return (
    <section className='SimpleMap' >
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={customIcon}/>
      </MapContainer>
    </section>
  )
}

export default MapListings