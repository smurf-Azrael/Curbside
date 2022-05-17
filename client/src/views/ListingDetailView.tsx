import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../contexts/ApiProvider';
import '../styling/ListingDetailView.scss';
import ButtonWide from '../components/ButtonWide';
import SimpleMap from '../components/SimpleMap';
import ImageCarousel from '../components/ImageCarousel';
import { useAuth } from '../contexts/AuthContext';
import AppBody from '../components/AppBody';
import { Listing } from '../interfaces/Listing';
import FullScreenLoadingIndicator from '../components/FullScreenLoadingIndicator';
const stockimgLink =
  'https://media.istockphoto.com/vectors/user-icon-people-icon-isolated-on-white-background-vector-vector-id1210939712?k=20&m=1210939712&s=612x612&w=0&h=xJqEPQnMiNofprbLXWdEtJQ75QL79lQ5N76J4JOdTIM=';
const ListingDetailView = () => {
  // Need to add heart button functionality
  const [listing, setListing] = useState<Listing>();
  const api = useApi();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadListingData = async () => {
      const res = await api.get(`/listings/${id}`);
      if (res.ok) {
        setLoading(false);
        setListing(res.body.data.listing);
      } else {
        setLoading(false);
        console.log('failing to load listing data');
        // handleErrors
      }
    };
    loadListingData();
  }, [api, id]);

  const handleMarkAsSold = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await api.patch(`/listings/${listing!.id}`, {
        status: listing!.status === 'available' ? 'sold' : 'available',
      });
      setListing((prevListing: any) => ({ ...prevListing, status: response.body.data.listing.status }));
      setLoading(false);
    } catch (e) {
      console.log('Error handling listing status update.');
      setLoading(false);
    }
  };

  return (
    <AppBody>
      {loading ? <FullScreenLoadingIndicator /> : <></>}
      {listing !== undefined ? (
        <section className="ListingDetailView">
          <section className="listing-owner-info-wrapper">
            <section className="listing-owner-image-wrapper">
              <img
                src={listing.userPhotoUrl ?? stockimgLink}
                alt={'user'}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = stockimgLink;
                }}
              />
            </section>
            <section className="listing-owner-name-buttons-wrapper">
              <p className="listing-owner-name">{`${listing.userFirstName} ${listing.userLastName.slice(0, 1)}.`}</p>
            </section>
          </section>
          {currentUser && listing.userId !== currentUser.id ? (
            <section className="listing-button-wrapper">
              <ButtonWide
                clickFunction={() => navigate(`/chats/${listing.id}`, { state: listing })}
                content={'Contact seller'}
                fill={true}
              />
            </section>
          ) : (
            <ButtonWide
              fill={listing!.status === 'available'}
              content={`Mark as ${listing!.status === 'available' ? 'sold' : 'available'}`}
              clickFunction={handleMarkAsSold}
            ></ButtonWide>
          )}
          <section className="listing-details-gallery-wrapper">
            <ImageCarousel carouselItems={listing.photoUrls} />
          </section>
          <section className="listing-details-data-wrapper">
            <div className="price-favorite-button-wrapper">
              <h4>{`${(listing.priceInCents / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'EUR',
              })}`}</h4>
              <i className="bi bi-heart-fill"></i>
            </div>
            <h4>{listing.title}</h4>
            <p>
              <span className="listing-detail-title">Condition:</span>
              {listing.condition === 'gentlyUsed' ? 'gently used' : listing.condition}
            </p>
            <p>
              <span className="listing-detail-title">Description: </span>
              {listing.description}
            </p>
            <p className="listing-detail-title">Location: </p>
          </section>
          <SimpleMap position={{ lng: listing.longitude, lat: listing.latitude }} radius={1} />
        </section>
      ) : (
        <></>
      )}
    </AppBody>
  );
};

export default ListingDetailView;
