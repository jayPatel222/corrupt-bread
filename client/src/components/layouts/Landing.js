import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/posts"></Redirect>;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">A thoughtful Approach</h1>
          <p className="lead">
            Create a consumer profile, share your views on food adulterations
            and products you like to discuss.
          </p>
          <div className="buttons">
            <Link to="register" className="btn btn-primary">
              Sign up
            </Link>
            <Link to="login" className="btn btn-light">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStatetoProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStatetoProps)(Landing);
