// @ts-nocheck
import { useApi } from "../contexts/ApiProvider"
import { useEffect, useState, useRef, useCallback, KeyboardEvent } from "react"
import { Link } from "react-router-dom";
import { mocks } from '../mocks';
import ListingPreview from "../components/ListingPreview";
import FiltersComponent from "../components/FiltersComponent";
import LocationRadius from "../components/LocationRadius";
import Header from '../components/Header';
import Footer from "../components/Footer";
import '../styling/HomeView.css';
import LocationPreviewComponent from "../components/LocationPreviewComponent";
import loader from '../assets/loader.gif';
import RoundedButton from '../components/RoundedButton';

export default function HomeView() {
  const api = useApi()

  const [listings, setListings] = useState<any[]>([]);
  const [FiltersAreVisible, setFiltersAreVisible] = useState(false);
  const [locationIsVisible, setLocationIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [tagStack, SetTagStack] = useState<any[]>([]);
  const [locationGroupField, setLocationGroupField] = useState<any[]>({})
  
  const tagsField = useRef<{ [key: string]: string }>({}) // categories need to be decided {catName: false, }
  const sortByField = useRef<HTMLSelectElement>(null);
  const maxPriceField = useRef<HTMLInputElement>(null);
  const minPriceField = useRef<HTMLInputElement>(null);
  const conditionField = useRef<HTMLSelectElement>(null);
  const fields = { tagsField, sortByField, maxPriceField, minPriceField, conditionField, SetTagStack };
  
  const offset = useRef<number>(0);
  const searchField = useRef<HTMLInputElement>(null);

  const getListings = useCallback(async (offset: number) => {
    const longitude = locationGroupField.lat//CHANGE TO PULL FROM SOMEWHERE
    const latitude =  locationGroupField.lng // CHANGE TO PULL FROM SOMEWHERE
    const radius = locationGroupField.radius || 10;
    const maxPrice = maxPriceField.current?.value || undefined;
    const minPrice = minPriceField.current?.value || 0;
    const sortBy = sortByField.current?.value || 'closest';
    const condition = conditionField.current?.value || 'all';
    const search = searchField.current?.value || undefined;
    const tagString = tagStack.map(el => el.replace(/\s+/g, '')).join(' ');
    const tags = tagString !== '' ? tagString : undefined;
    const query = { search, offset, radius, condition, tags, maxPrice, minPrice, sortBy, latitude, longitude };
    // add 'search' to query
    const res = await api.get('/listings', query)
    return res;
  }, [api, tagStack, locationGroupField])

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
    console.warn(conditionField.current?.value)
    console.log('-->', sortByField.current?.value)
    setTimeout(() => { console.log('line79', sortByField) }, 1000)
    console.log(maxPriceField.current?.value)

    const res = await getListings(0);
    if (res.ok) {
      offset.current = res.body.data.offset;
      setListings(res.body.data.listings);

    } else {
      //handleError
    }
  }

  const loadData = async () => {
    const res = await getListings(0);
    if (res.ok) {
      offset.current = res.body.data.offset;
      setListings(res.body.data.listings);
      setLoadingError(false);
      console.log('hi here')
      searchField.current!.value = "";
    } else {
      // handleErrors
      setListings(mocks.listings);
      setLoadingError(false);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [api])


  function pressEnter(event: KeyboardEvent<HTMLInputElement>): any {
    if (event.key === 'Enter') {
      loadData();
    }
  }


  return (
    <div className="body-page">
      <div className='body-header-container' >
        <Header />
      </div>
      <div className="body-content-background">
        <div className="body-frame">
          <LocationPreviewComponent />{/*Empty for now, but will possibly show preview of your location  */}

          <div className="global-search-area">
            <div className='search-bar-container'>
              <button onClick={() => loadData()}><i className="bi bi-search"></i></button>
              <input ref={searchField} className="main-input" placeholder="Search.." onKeyPress={(e) => pressEnter(e)} />
            </div>
            <div className='search-buttons-group' >
              <button className="search-location-button search-btn" onClick={openLocationModal}>
                <p>
                  <i className="bi bi-geo-alt"></i>
                  {locationGroupField.address ? locationGroupField.address : "Location"}
                </p>
              </button>
              <button className="search-filter-button search-btn" onClick={openFiltersModal}>
                <p>
                  Filter
                  <i className="bi bi-sliders"></i>
                </p>
              </button>
            </div>
          </div>

          <LocationRadius
            locationIsVisible={locationIsVisible}
            closeLocationModal={closeLocationModal}
            // locationGroupField={locationGroupField}
            setLocationGroupField={setLocationGroupField}
          />

          <FiltersComponent
            filtersAreVisible={FiltersAreVisible}
            closeFiltersModal={closeFiltersModal}
            applyFilters={applyFilters}
            fields={fields}
          />
          <RoundedButton content={<i className="bi bi-map"></i>} />
          <div className='listings-container' >
            {listings.map((listing, index) => {
              return (
                <Link key={index} to={`/listing/${listing.id}`} style={{ textDecoration: "none", color: "black" }}>
                  <ListingPreview key={listing.id} listing={listing} />
                </Link>)
            })}
            {!isLoading && listings.length === 0 && <p>No listing matched your request...</p>}
            {loadingError && <p>Couldn't load listings :/</p>}
            {isLoading && <img style={{ height: '20vw', maxHeight: '200px', borderRadius: '20px' }} src={loader} alt="Loading..." />}
          </div>
        </div>
      </div>

      <div className='body-footer-container'>
        <Footer />
      </div>
    </div>
  )
}
