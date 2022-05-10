import '../styling/ListingPreview.css';

export default function ListingPreview ({listing}: {[key:string]:any}) {
  let croppedDescription = '';
  if(listing.description.length > 60) {
    croppedDescription = `${listing.description.slice(0, 100)}...`;
  } else {
    croppedDescription = listing.description;
  }

  let croppedTitle = '';
  if(listing.title.length > 17) {
    croppedTitle = `${listing.title.slice(0, 20)}...`;
  } else {
    croppedTitle = listing.title;
  }

  return (
    <div className='card-product-content'>
      <div className='card-product-image-holder'>
        <img src={listing.images[0]} alt='product sold' width='200' />
      </div>
      <div className='card-product-product-info'>
        <span className='product-info-price'>{listing.price} EUR</span>
        <span className='product-info-title'>{croppedTitle}</span>
        <span className='product-info-description'>{croppedDescription}</span>
      </div>
    </div>

  )
}