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
              <p style={{ fontWeight: "bold" }}>
                {user.firstName} {user.lastName[0]}.
              </p>
              <Link to="/set-profile">
                {currentUser && user.id === currentUser.id && <ButtonSmall content={"Edit"} fill={true} />}
              </Link>
            </div>
          </div>
          <div className="profile-favorites-wrapper">
            <Link to="/favorites">
              {currentUser && user.id === currentUser.id && <ButtonSmall content={"My favorites"} fill={false} />}
            </Link>
          </div>
          <p style={{ textAlign: "left" }}>Listings</p>
          <div className="profile-my-listings-wrapper">
            {userListings.length > 0 &&
              userListings.map((listing) => (
                <div key={listing.id} className="listing-container">
                  <ListingPreview  listing={listing} />
                </div>
              ))}
          </div>
        </section>
      </AppBody>
  ) : (<></>)

}

export default ProfileView;
