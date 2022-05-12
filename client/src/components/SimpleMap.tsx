import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/ListingDetail.css'


const customIcon = new Icon({
  iconUrl: "/icons8-select-24.png",
  iconSize: [17, 17]
})

const SimpleMap = ({position}: {position: {lat: number, lng: number}}) => {

  return (
    <section className='map-component' >
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
    </section>
  )
}

export default SimpleMap