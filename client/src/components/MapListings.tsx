import {useEffect, useState, useRef} from 'react'
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/MapListings.scss'
import { Listing } from '../interfaces/Listing';
import * as L from 'leaflet';
import ReactDOM from 'react-dom'
import 'leaflet.markercluster';
import cluster from 'cluster';
// @ts-ignore
import('leaflet.markercluster/dist/leaflet.markercluster.js')
// @ts-ignore
import('leaflet.markercluster/dist/MarkerCluster.css')
// @ts-ignore
import('leaflet.markercluster/dist/MarkerCluster.Default.css')

const customIcon = new Icon({
  iconUrl: "/icons8-select-24.png",
  iconSize: [17, 17]
})

const MapListings = ({listings}:{listings:Listing[]}) => {
  const [activeListing, setActiveListing] = useState<Listing | null>(null)
  const map = useRef<L.Map>();
  const clusterLayer = useRef<L.MarkerClusterGroup>();
  

  useEffect(()=>{
    clusterLayer.current?.remove();


    if(!map.current){
      return;
    }

    if(clusterLayer && clusterLayer.current){
      map.current.removeLayer(clusterLayer.current);
      clusterLayer.current?.remove()
    }

    clusterLayer.current = L.markerClusterGroup()

    listings.forEach(listing=> 
      L.circleMarker(L.latLng(listing.latitude, listing.longitude), {radius: 5})
      .bindTooltip(`Title:${listing.title}`)
      .addTo(clusterLayer.current!)
    )

    map.current.addLayer(clusterLayer.current)
  },[listings])

  useEffect(()=>{
    const mapNode = ReactDOM.findDOMNode(document.getElementById('mapId')) as HTMLDivElement

    if (!mapNode || map.current){
      return
    }

    map.current = L.map(mapNode).setZoom(9).setView(L.latLng(52.5200, 13.405))

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {maxZoom: 17}).addTo(map.current)
  },[])
  

  // const listingMarkers = listings.map(listing=>{
  //   let markerPosition  : {lat: number, lng: number} = {lat: listing.latitude, lng: listing.longitude}
  //   return <Marker 
  //     position={markerPosition} 
  //     icon={customIcon} 
  //     key={listing.id}
  //     eventHandlers={{
  //       click: (e) => {
  //         console.log('marker clicked', e)
  //         setActiveListing(listing)
  //       },
  //     }}
  //     />
  // })

  const {userPosition} : {userPosition: {lat: number, lng: number} }= {userPosition: {lat: 52.5200, lng: 13.4050 }}
  return (
    <div style={{width: '100vh', height: '100vh'}} id="mapId">
    </div>
    )
}

export default MapListings