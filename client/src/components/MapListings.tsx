import { useEffect, useState, useRef } from 'react'
import 'leaflet/dist/leaflet.css';
import { Listing } from '../interfaces/Listing';
import * as L from 'leaflet';
import ReactDOM from 'react-dom'
import 'leaflet.markercluster';
import MapListingPreview from './MapListingPreview';
// @ts-ignore
import('leaflet.markercluster/dist/leaflet.markercluster.js')
// @ts-ignore
import('leaflet.markercluster/dist/MarkerCluster.css')
// @ts-ignore
import('leaflet.markercluster/dist/MarkerCluster.Default.css')

const MapListings = ({ listings }: { listings: Listing[] }) => {
  const [activeListing, setActiveListing] = useState<Listing | null | undefined>(null)
  const map = useRef<L.Map>();
  const clusterLayer = useRef<L.MarkerClusterGroup>();


  useEffect(() => {
    clusterLayer.current?.remove();

    if (!map.current) {
      return;
    }

    if (clusterLayer && clusterLayer.current) {
      map.current.removeLayer(clusterLayer.current);
      clusterLayer.current?.remove()
    }

    clusterLayer.current = L.markerClusterGroup()

    listings.forEach(listing => {

      let oneMarker = L.circleMarker(L.latLng(listing.latitude, listing.longitude), { radius: 5 })
      //@ts-ignore
      oneMarker.options['id'] = listing.id;
      oneMarker.addTo(clusterLayer.current!)
      oneMarker.on('click', () => {
        let clickedListing = listings.find(l => l.id === listing.id)
        console.log(clickedListing)
        setActiveListing(clickedListing)
      })
    }
    )

    map.current.addLayer(clusterLayer.current)
  }, [listings])

  useEffect(() => {
    const mapNode = ReactDOM.findDOMNode(document.getElementById('mapId')) as HTMLDivElement

    if (!mapNode || map.current) {
      return
    }

    map.current = L.map(mapNode).setZoom(9).setView(L.latLng(52.5200, 13.405))

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 17 }).addTo(map.current)
  }, [])

  return (
    <div className='map-set-height'>
      <div style={{ flexGrow:'1', zIndex: '0', position:'relative'}} id="mapId"></div>
      {activeListing ? <MapListingPreview activeListing={activeListing} /> : null}
    </div>
  )
}

export default MapListings


