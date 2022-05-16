import { useApi } from "../contexts/ApiProvider"
import { useEffect, useState, useRef, useCallback, KeyboardEvent } from "react"
import { Link } from "react-router-dom";
import ListingPreview from "../components/ListingPreview";
import FiltersComponent from "../components/FiltersComponent";
import LocationRadius from "../components/LocationRadius";
import RoundedButton from '../components/RoundedButton';
import '../styling/HomeView.scss';
import LocationPreviewComponent from "../components/LocationPreviewComponent";
import loader from '../assets/loader.gif';
import AppBody from "../components/AppBody";
import { useAuth } from '../contexts/AuthContext';
import { LocationGroupInterface } from "../interfaces/LocationGroup";

export default function HomeView() {
  const api = useApi();
  const loadUserLocation = async () => {
    const res = await api.get(`/users/${currentUser?.id}`);
    let userLocation ;
    if (res.ok) {
      userLocation = {
        latitude: res.body.data.user.latitude,
        longitude: res.body.data.user.longitude,
        radius: 25,
        address: res.body.data.user.city
      }
    } else {
      console.log("failing to load user listing data or user not logged in");
      userLocation = {
        latitude: 51.4,
        longitude: 14.3,
        radius: 25,
        address: "Berlin"
      }
    }
    setLocationGroupField(userLocation)
    // return userLocation
  };

  const [listings, setListings] = useState<any[]>([]);
  const [FiltersAreVisible, setFiltersAreVisible] = useState(false);
  const [locationIsVisible, setLocationIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const tagStack = useRef<string[]>([]);

  const { currentUser } = useAuth();

  const [locationGroupField, setLocationGroupField] = useState<{ latitude: number; longitude: number; radius: number; address: string; }>({
    latitude: 52.04,
    longitude: 13.03,
    radius: 25,
    address: "Berlin"
  });


  // const tagsField = useRef<{ [key: string]: string }>({}) // categories need to be decided {catName: false, }
  const sortByField = useRef<HTMLSelectElement>(null);
  const maxPriceField = useRef<HTMLInputElement>(null);
  const minPriceField = useRef<HTMLInputElement>(null);
  const conditionField = useRef<HTMLSelectElement>(null);
  const fields = { sortByField, maxPriceField, minPriceField, conditionField, tagStack };

  const offset = useRef<number>(0);
  const searchField = useRef<HTMLInputElement>(null);

  const getListings = useCallback(async (offset: number, locationGroupField: LocationGroupInterface) => {
    console.log('tagsField.current', tagStack.current)
    const longitude = locationGroupField?.longitude || 13.38 //CHANGE TO PULL FROM SOMEWHERE
    const latitude = locationGroupField?.latitude || 52.52 // CHANGE TO PULL FROM SOMEWHERE
    const radius = locationGroupField?.radius || 50;
    const maxPrice = maxPriceField.current?.value || undefined;
    const minPrice = minPriceField.current?.value || 0;
    const sortBy = sortByField.current?.value || 'closest';
    const condition = conditionField.current?.value || 'all';
    const search = searchField.current?.value || undefined;
    const tagString = tagStack.current.map(el => el.replace(/\s+/g, '')).join(' ');
    const tags = tagString !== '' ? tagString : undefined;
    const query = { search, offset, radius, condition, tags, maxPrice, minPrice, sortBy, latitude, longitude };
    // add 'search' to query
    const res = await api.get('/listings', query)
    return res;
  }, [api])

  // async function handleScroll() {
  //   const res = await getListings(offset.current);
  //   if (res.ok) {
  //     offset.current = res.body.data.offset;
  //     setListings(res.body.data.listings);
  //   } else {
  //     //handleError
  //   }
  // }
  const openFiltersModal = () => setFiltersAreVisible(true)
  const closeFiltersModal = () => setFiltersAreVisible(false)
  const openLocationModal = () => setLocationIsVisible(true)
  const closeLocationModal = () => setLocationIsVisible(false)

  async function applyFilters() {
    closeFiltersModal();
    closeLocationModal();

    const res = await getListings(0, locationGroupField);
    if (res.ok) {
      offset.current = res.body.data.offset;
      setListings(res.body.data.listings);
    } else {
      //handleError
    }
  }

  async function handleSearch() {
    const res = await getListings(0, locationGroupField);
    if (res.ok) {
      offset.current = res.body.data.offset;
      setListings(res.body.data.listings);
      setLoadingError(false);
      searchField.current!.value = "";
    } else {
      // handleErrors
      // setListings(mocks.listings);
      setLoadingError(false);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const loadData = async () => {
      const res = await getListings(0, locationGroupField);
      if (res.ok) {
        offset.current = res.body.data.offset;
        setListings(res.body.data.listings);
        setLoadingError(false);
        searchField.current!.value = "";
      } else {
        setLoadingError(false);
      }
      setIsLoading(false);
    }
    loadData();
    if (currentUser) {
      (async () => {
        loadUserLocation();
        // locationGroupField.current = await loadUserLocation();
      })();
    }
  }, [api, getListings, currentUser])


function pressEnter(event: KeyboardEvent<HTMLInputElement>): any {
  if (event.key === 'Enter') {
    handleSearch();
  }
}

return (
  <AppBody>
    <div className="HomeView">
      <LocationPreviewComponent />{/*Empty for now, but will possibly show preview of your location  */}

      <div className="global-search-area">
        <div className='search-bar-container'>
          <button onClick={() => handleSearch()}><i className="bi bi-search"></i></button>
          <input ref={searchField} className="main-input" placeholder="Search.." onKeyPress={(e) => pressEnter(e)} />
        </div>
        <div className='search-buttons-group' >
          <button className="search-location-button search-btn" onClick={openLocationModal}>
            <span>
              <i className="bi bi-geo-alt"></i>
              {locationGroupField.address ? locationGroupField.address : "Location"}
            </span>
          </button>
          <button className="search-filter-button search-btn" onClick={openFiltersModal}>
            <span>
              <i className="bi bi-sliders"></i>
              Filter
            </span>
          </button>
        </div>
      </div>

      <FiltersComponent
        filtersAreVisible={FiltersAreVisible}
        closeFiltersModal={closeFiltersModal}
        applyFilters={applyFilters}
        fields={fields}
      />
      <LocationRadius
        locationIsVisible={locationIsVisible}
        closeLocationModal={closeLocationModal}
        applyFilters={applyFilters}
        locationGroupField={locationGroupField}
        setLocationGroupField={setLocationGroupField}
      />
      <div className='listings-container' >
        {listings.map(listing => {
          return (<Link key={listing.id} to={`/listing/${listing.id}`} style={{ textDecoration: "none", color: "black" }}>
            <ListingPreview listing={listing} />
          </Link>)
        })}
        {!isLoading && listings.length === 0 && <p>No listing matched your request...</p>}
        {loadingError && <p>Couldn't load listings :/</p>}
        {isLoading && <img style={{ height: '20vw', maxHeight: '200px', borderRadius: '20px' }} src={loader} alt="Loading..." />}
      </div>
      <div className="map-btn-float" style={{}} >
        <RoundedButton content={<i className="bi bi-map"></i>} />
      </div>
    </div>
  </AppBody>
)
}
