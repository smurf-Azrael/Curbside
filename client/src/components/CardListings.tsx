import React, { useEffect, useState, SetStateAction  } from 'react';
import { Link } from 'react-router-dom';
import { Listing } from '../interfaces/Listing';
import ListingPreview from './ListingPreview';
import '../styling/CardListings.scss';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiProvider';
import EmptyState from '../components/EmptyState'

// @ts-ignore
import('leaflet.markercluster/dist/leaflet.markercluster.js')
// @ts-ignore
import('leaflet.markercluster/dist/MarkerCluster.css')
// @ts-ignore
import('leaflet.markercluster/dist/MarkerCluster.Default.css')

interface cardArguments {
  listings: Listing[],
  isLoading: boolean,
  loadingError: boolean,
  favoriteList: Listing[],
  setFavoriteList: React.Dispatch<SetStateAction<Listing[]>>
}

function CardListings({ listings, isLoading, loadingError, favoriteList, setFavoriteList }: cardArguments) {
  const [displayError, setDisplayError] = useState(false)
  const { currentUser } = useAuth();
  const api = useApi();
  async function heartToggle(listingId: string) {
    if (currentUser) {
      if (favoriteList.filter(element => element.id === listingId).length === 1) {
        const response = await api.delete(`/favorites`, { favoriteId: listingId })
        if (!response.ok) {
          return;
        }
        setFavoriteList((prev) => prev.filter(listing => listing.id !== listingId));
      } else {
        const response = await api.patch(`/favorites`, { favoriteId: listingId })
        if (!response.ok) {
          return;
        }
        setFavoriteList(prev => [...prev, listings.filter(listing => listing.id === listingId)[0]] );
      }
    } else {
      setDisplayError(true)
      setTimeout(() => setDisplayError(false),4000)
      // handle user not logged in
    }
  }

  const listings4Display = listings.map(listing => {

    return (
      <div className='listing-preview' key={listing.id}>
        <button onClick={()=>heartToggle(listing.id)} >
          {favoriteList && favoriteList.filter(element => element.id === listing.id).length === 1 ?
            (<i className="bi bi-heart-fill"></i>)
            :
            (<i className="bi bi-heart"></i>)}
        </button>
        <Link key={listing.id} to={`/listing/${listing.id}`} style={{ textDecoration: "none", color: "black" }}>
          <ListingPreview listing={listing} />
        </Link>
      </div>
    )
  })

  return (
    <div className="CardListings">
      {
      <div className={`message-not-logged-in ${displayError && 'display-error'}`}>
        <p >Log in to save listings</p>
      </div>
      }
      {listings4Display}
      {!isLoading && listings.length === 0 && <EmptyState text="No listings"/>}
      {loadingError && <EmptyState text="Couldn't load listings"/> }
    </div>
  );
}

export default CardListings;
