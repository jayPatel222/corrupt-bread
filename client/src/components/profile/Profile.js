import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop.js";
const Profile = ({ getProfileById, profile, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      <Link to="/users" className="btn btn-light">
        Back
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.profile.user._id && (
          <Link to="/edit-profile" className="btn btn-primary">
            Edit Profile
          </Link>
        )}
      <div class="profile-grid my-1">
        <ProfileTop profile={profile}></ProfileTop>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
