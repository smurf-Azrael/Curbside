// @ts-nocheck
import React, { useEffect, useState } from "react";
import "../styling/ProfileView.scss";
import ButtonSmall from "../components/ButtonSmall";
import { useApi } from "../contexts/ApiProvider";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AppBody from "../components/AppBody";
import CardListings from "../components/CardListings";
import ProfileImage from "../components/ProfileImage";

function ProfileView() {
  const [userListings, setUserListings] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [activeListingSelection, setActiveListingSelection] = useState<ActiveListingSelection>({myListings: true, myFavorites: false});
  const [user, setUser] = useState();
  const api = useApi();
  const navigate = useNavigate()
  const { id } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadUserData = async () => {
      const res = await api.get(`/users/${id}`);
      if (res.ok) {
        setUser(res.body.data.user);
        setUserListings(res.body.data.listings);
        setLoadingError(false);
      } else {
        console.log("failing to load user listing data");
        navigate('/')
        setLoadingError(false);
        // handleErrors
      }
      setIsLoading(false);
    };
    loadUserData();
  }, [api, navigate, id]);

  const handleActivateMyListings = () => {
    setActiveListingSelection({
      myListings: true,
      myFavorites: false
    })
  }

  const handleActivateMyFavorites = () => {
    setActiveListingSelection({
      myListings: false,
      myFavorites: true
    })
  }

  return user ? (
    <AppBody>
        <section className="ProfileView">
          <div className="profile-about-info-wrapper">
            {/* <div className="profile-image-wrapper" style={{backgroundImage: user.profileImage ? `url("${user.profileImage}")` : `url("https://gradient-avatar.glitch.me/${id}")`}}>
              <span>
                {user.profileImage ? '' : user.firstName[0]}
              </span>
            </div> */}
            <ProfileImage user={user} />
            <div className="profile-basic-info-edit-wrapper">
              <p>
                {user.firstName} {user.lastName[0]}.
              </p>
              <Link to="/set-profile">
                {currentUser && user.id === currentUser.id && <ButtonSmall content={"Edit"} fill={true} />}
              </Link>
            </div>
          </div>
          {currentUser && user.id === currentUser.id ? <nav className="profile-listings-shown-options-wrapper">
              <button onClick={handleActivateMyListings} className={`option-name ${activeListingSelection.myListings === true ? 'active' : ''}`} >My Listings</button>
              <button onClick={handleActivateMyFavorites} className={`option-name ${activeListingSelection.myFavorites === true ? 'active' : ''}`} >My Favorites</button>
          </nav> : <p className="option-name">Listings</p>}
          {activeListingSelection.myListings === true &&
            <CardListings listings={userListings} isLoading={isLoading} loadingError={loadingError}/>
          }
          {activeListingSelection.myFavorites === true &&
            <div>My favorites not yet implemented</div>
          }
        </section>
      </AppBody>
  ) : (<></>)

}

interface ActiveListingSelection {
  myListings: boolean,
  myFavorites: boolean
}

export default ProfileView;
