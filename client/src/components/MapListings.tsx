import {useEffect, useState, useRef} from 'react'
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styling/MapListings.scss'
import { Listing } from '../interfaces/Listing';
import * as L from 'leaflet';
import ReactDOM from 'react-dom'
import 'leaflet.markercluster';
// @ts-ignore
import('leaflet.markercluster/dist/leaflet.markercluster.js')
// @ts-ignore
import('leaflet.markercluster/dist/MarkerCluster.css')
// @ts-ignore
import('leaflet.markercluster/dist/MarkerCluster.Default.css')

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
  
  return (
    <div style={{width: '100vh', height: '100vh'}} id="mapId">
    </div>
    )
}

export default MapListings