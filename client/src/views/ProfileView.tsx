// @ts-nocheck
import React, { useEffect, useState } from "react";
import "../styling/ProfileView.scss";
import ButtonSmall from "../components/ButtonSmall";
import { useApi } from "../contexts/ApiProvider";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ListingPreview from "../components/ListingPreview";
import { Link } from "react-router-dom";
import AppBody from "../components/AppBody";

function ProfileView() {
  const [userListings, setUserListings] = useState([]);
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
      } else {
        console.log("failing to load user listing data");
        navigate('/')
        // handleErrors
      }
    };
    loadUserData();
  }, [api, navigate, id]);
  return user ? (
    <AppBody>
        <section className="ProfileView">
          <div className="profile-about-info-wrapper">
            <div className="profile-image-wrapper">
              <img
                src={"https://gradient-avatar.glitch.me/" + user.id}
                alt={"user"}
              />
            </div>
            <div className="profile-basic-info-edit-wrapper">
              <p>
                {user.firstName} {user.lastName[0]}.
              </p>
              <Link to="/set-profile">
                {currentUser && user.id === currentUser.id && <ButtonSmall content={"Edit"} fill={true} />}
              </Link>
            </div>
          </div>
          <nav className="profile-listings-shown-options-wrapper">
              <div className="option-name" style={{ textAlign: "left" }}>My Listings</div>
              <div className="option-name" style={{ textAlign: "left" }}>My Favorites</div>
          </nav>
          <div className="profile-my-listings-wrapper">
            {userListings.length > 0 &&
              userListings.map((listing) => {
                return (<Link key={listing.id} to={`/listing/${listing.id}`} style={{ textDecoration: "none", color: "black" }}>
                      <ListingPreview  listing={listing} />
                </Link>)
            })}
          </div>
        </section>
      </AppBody>
  ) : (<></>)

}

export default ProfileView;
