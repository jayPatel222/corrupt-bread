import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";
import AccountActions from "./AccountActions";
const Account = ({ getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return profile.loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-dark">Account</h1>
      <p className="lead">
        {" "}
        <i className="fa fa-user"></i> Welcome {auth.user && auth.user.name}
      </p>
      {profile.profile !== null ? (
        <Fragment>
          <AccountActions />
        </Fragment>
      ) : (
        <Fragment>
          <p> You dont have profile,Please set up one</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Account.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Account);
