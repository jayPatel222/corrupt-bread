import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getCurrentProfile, getProfiles, profile }) => {
  useEffect(() => {
    getProfiles();
    getCurrentProfile();
  }, [getProfiles]);
  return (
    <Fragment>
      <div className="large text-primary">Users</div>
      <div className="profiles">
        {profile.profiles.length > 0 && profile.profile !== null ? (
          profile.profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>Please create your profile to view other users </h4>
        )}
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles, getCurrentProfile })(
  Profiles
);
