import { useApi } from "../contexts/ApiProvider"
import { useEffect, useState, useRef, useCallback } from "react"
import { mocks } from '../mocks';
import ListingPreview from "../components/ListingPreview";
import { ReactComponent as FiltersIcon } from "../assets/filters.svg";
import FiltersComponent from "../components/FiltersComponent";

export default function HomeView () {
  const api = useApi()

  const [listings, setListings] = useState<any[]>([]);
  const [FiltersAreVisible, setFiltersAreVisible] = useState(false);


  const offset = useRef<number>(0);
  const radiusField = useRef<HTMLInputElement>(null); // for geo modal

  const tagsField = useRef<{[key:string]:string}>({})
  const sortByField = useRef<HTMLSelectElement>(null);
  const maxPriceField = useRef<HTMLInputElement>(null);
  const minPriceField =  useRef<HTMLInputElement>(null); 
  const conditionField = useRef<HTMLSelectElement>(null);
  const fields = { tagsField, sortByField, maxPriceField, minPriceField, conditionField }

  const getListings = useCallback(async (offset:number) => {
    const tagString = Object.values(tagsField.current).join('+');
    const tags = tagString !== '' ? tagString : undefined;
    const radius = radiusField.current?.value || 10;
    const maxPrice = maxPriceField.current?.value || undefined;
    const minPrice = minPriceField.current?.value || 0;
    const sortBy = sortByField.current?.value || 'closest';
    const condition = conditionField.current?.value || 'all';
    const query = {offset:offset, radius, condition, tags, maxPrice, minPrice, sortBy};
    return  await api.get('/listings', query);
  }, [api])


  
  async function handleScroll() {
    const res = await getListings(offset.current); 
    if (res.ok) {
      offset.current = res.body.data.offset;
      setListings(res.body.data.listings);
    } else {
      //handleError
    }
  }
  const openFiltersModal = () => setFiltersAreVisible(true)
  const closeFiltersModal = () => setFiltersAreVisible(false)

  async function applyFilters() {
    closeFiltersModal();
    console.log(conditionField.current?.value)
    console.log(sortByField.current?.value)

    const res = await getListings(0); 
    if (res.ok) {
      offset.current = res.body.data.offset;
      setListings(res.body.data.listings);
    } else {
      //handleError
    }
  }

  useEffect(()=> {
    const loadData = async () => {
      const res = await getListings(0);
      if (res.ok) {
        offset.current = res.body.data.offset;
        setListings(res.body.data.listings);
      } else {
        setListings(mocks.listings)
        // handleErrors
      }
    }
    loadData();
  }, [api, getListings]) 
  
  return (
    <>
      <button onClick={ openFiltersModal }><FiltersIcon /></button>
        <FiltersComponent
          filtersAreVisible={FiltersAreVisible}
          closeFiltersModal={closeFiltersModal}
          applyFilters={applyFilters}
          fields={fields}
        />
      {listings.length > 0 && listings.map(listing => <ListingPreview key={listing.id} listing={listing}/>)}
    </>
  )
}
