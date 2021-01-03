import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    location,
    instagram,
    facebook,
  },
}) => {
  return (
    <div className="profile card">
      <img className="round-img" src={avatar} alt="" />
      <div>
        <h1>{name}</h1>
        <p>{status}</p>
        <p className="my-1">{location && <span>{location}</span>}</p>

        <Link to={`/user/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {};

export default ProfileItem;
