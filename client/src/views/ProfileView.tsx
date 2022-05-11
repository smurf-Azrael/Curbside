// @ts-nocheck
import React, { useEffect, useState } from 'react'
import '../styling/Profile.css';
import ButtonSmall from '../components/ButtonSmall';
import { useApi } from '../contexts/ApiProvider';
// import { useNavigate } from 'react-router-dom';
import { mocks } from '../mocks'
import ListingPreview from '../components/ListingPreview';

function ProfileView() {
  const [userListings, setUserListings] = useState()

  // const api = useApi();
  // const navigate =useNavigate();

  // Setup for using Mock data
  const USER_ID = '4f4442a7-aa22-490b-9945-34763d9fa0d9';
  const mockedUserListings = mocks.listings.filter(listing => listing.userId === USER_ID);
  setUserListings(mockedUserListings);
  console.log({mockedUserListings})
  console.log({userListings})

  // useEffect(()=> {
  //   console.log('is in useEffect')
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
  // }, [api, mockedUserListings, userListings])

  return (
    <section className='profile-page-wrapper'>
      <div className='profile-about-info-wrapper'>
        <div className='profile-image-wrapper'>
          Img goes here
        </div>
        <div className='profile-basic-info-edit-wrapper'>
          Name L.
          <ButtonSmall content={'Edit'} fill={true}/>
        </div>
      </div>
      <div className='profile-favorites-wrapper'>
        <ButtonSmall content={'My favorites'} fill={false}/>
      </div>
      <div className='profile-my-listings-wrapper'>
       {userListings.map(listing => <ListingPreview key={listing.id} listing={listing} />)}
      </div>
    </section>
  )
}

export default ProfileView