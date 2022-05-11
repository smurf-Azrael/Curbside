// @ts-nocheck
import React, { useEffect, useState } from 'react'
import '../styling/Profile.css';
import ButtonSmall from '../components/ButtonSmall';
// import { useApi } from '../contexts/ApiProvider';
// import { useNavigate } from 'react-router-dom';
import { mocks } from '../mocks'
import ListingPreview from '../components/ListingPreview';
import { Link } from 'react-router-dom';

function ProfileView() {
  const [userListings, setUserListings] = useState([])

  // const api = useApi();
  // const navigate =useNavigate();

  // User id used for moc
  const USER_ID = '4f4442a7-aa22-490b-9945-34763d9fa0d9';

  // User name for display
  const mockUserData = mocks.Users.filter(user => user.id === USER_ID)[0];
  console.log({mockUserData});
  const nameToDisplay = `${mockUserData.firstName} ${mockUserData.lastName.slice(0,1)}.`

  useEffect(()=> {
    // Setup for using Mock data
    const mockedUserListings = mocks.listings.filter(listing => listing.userId === USER_ID);
    console.log({mockedUserListings})
    setUserListings(mockedUserListings);
    // Setup with api (to be updated once available)
    //   const loadUserData = async () => {
    //     const res = await api.get(`/listings/${USER_ID}`);
    //     if (res.ok) {
    //       console.log('res is ok');
    //       setUserListings(res.body.data.listings);
    //     } else {
    //       console.log('failing to load user listing data')
    //     }
    //       // handleErrors
    //     }
    //   loadUserData();
    //   console.log({userListings})
  }, [])

  return (
    <section className='profile-page-wrapper'>
      <div className='profile-about-info-wrapper'>
        <div className='profile-image-wrapper'>
          <img src={mockUserData.photoUrl} alt={'user'} />
        </div>
        <div className='profile-basic-info-edit-wrapper'>
          <p style={{fontWeight:"bold"}}>{nameToDisplay}</p>
          <Link to='/set-profile'>
            <ButtonSmall content={'Edit'} fill={true}/>
          </Link>
        </div>
      </div>
      <div className='profile-favorites-wrapper'>
        <Link to='/favorites'>
          <ButtonSmall content={'My favorites'} fill={false}/>
        </Link>
      </div>
      <p style={{textAlign:"left"}}>My listings</p>
      <div className='profile-my-listings-wrapper'>
       {userListings.length > 0 && userListings.map(listing => <ListingPreview key={listing.id} listing={listing} />)}
      </div>
    </section>
  )
}

export default ProfileView