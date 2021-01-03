import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileTop = ({ profile }) => {
  return (
    <div>
      <div class="profile-top bg-primary p-2 card">
        <img class="round-img my-1" src={profile.profile.user.avatar} alt="" />
        <h1 class="large text-primary">{profile.profile.user.name}</h1>
        <p class="lead text-primary">{profile.profile.status}</p>
        <p className="text-dark">{profile.profile.location}</p>
        <div class="icons my-1">
          <a
            href={profile.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-linkedin fa-2x text-primary"></i>
          </a>
          <a
            href={profile.profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-instagram fa-2x text-dark"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
