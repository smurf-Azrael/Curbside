import React from 'react'
import { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
// import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
  // Berlin coordinates
  // const position = [52.51, 13.38]
  // const position = {lng:13.38, lat:52.51}
  const [position, setPosition] = useState({lng:13.38, lat:52.51})

  // --- (6) Create a custom marker ---
  // const customIcon = new Icon({
  //   iconUrl: '/icons8-select-24.png',
  //   iconSize: [33, 33],
    // iconAnchor: [1, 1],
    // popupAnchor: [-0, -76]
  // })

  // Get coordinates of a pont clicked on the map
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })



  return (
    <section className='map-component' >
      {/* --- (5) Add leaflet map container --- */}
      <div className='map' id='map' >
      {/* @ts-ignore:next-line */}
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          // @ts-ignore:next-line
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      {position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )}
        {/* <Marker position={position} icon={customIcon}>
          <Popup>🐻🍻🎉</Popup>
        </Marker> */}
      </MapContainer>
      {/* --- ---------------------------- --- */}
      </div>
    </section>
  )
}

export default Map