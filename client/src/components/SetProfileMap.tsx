// @ts-nocheck
import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import SetProfileMapLayers from './SetProfileMapLayers';

// import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {


  return (
    <section className='map-component' >
      {/* --- (5) Add leaflet map container --- */}
      <div className='map' id='map' >
      {/* @ts-ignore:next-line */}
      <MapContainer
        center={{lng:13.38, lat:52.51}}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: '300px', width: '50%' }}
      >
        <TileLayer
          // @ts-ignore:next-line
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetProfileMapLayers />
      </MapContainer>
      {/* --- ---------------------------- --- */}
      </div>
    </section>
  )
}

export default Map