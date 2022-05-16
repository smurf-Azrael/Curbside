// @ts-nocheck
import { useApi } from "../contexts/ApiProvider"
import { useEffect, useState, useRef, useCallback, KeyboardEvent } from "react"
import FiltersComponent from "../components/FiltersComponent";
import LocationRadius from "../components/LocationRadius";
import RoundedButton from '../components/RoundedButton';
import '../styling/HomeView.scss';
import LocationPreviewComponent from "../components/LocationPreviewComponent";
import AppBody from "../components/AppBody";
import CardListings from "../components/CardListings";
import MapListings from "../components/MapListings";



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
    const longitude = locationGroupField.lng || 13.38 //CHANGE TO PULL FROM SOMEWHERE
    const latitude = locationGroupField.lat || 52.52 // CHANGE TO PULL FROM SOMEWHERE
    const radius = locationGroupField.radius || 50;
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
      searchField.current!.value = "";
    } else {
      // handleErrors
      // setListings(mocks.listings);
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
    <AppBody>
      <div className="HomeView">
        <LocationPreviewComponent />{/*Empty for now, but will possibly show preview of your location  */}

        <div className="global-search-area">
          <div className='search-bar-container'>
            <button onClick={() => loadData()}><i className="bi bi-search"></i></button>
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
          setLocationGroupField={setLocationGroupField}
        />
        {/* <CardListings listings={listings} isLoading={isLoading} loadingError={loadingError}/> */}
        <MapListings listings={listings}/>
        <div className="map-btn-float" style={{}} >
          <RoundedButton content={<i className="bi bi-map"></i>}/>
        </div>
      </div>
    </AppBody>
  )
}
