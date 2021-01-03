import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getCurrentProfile } from "../../actions/profile";
const Post = ({ getCurrentProfile, getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      <div className="postcontainer">
        <p className="lead text-dark">
          <i className="fas fa-user text-primary"></i> Welcome to Corrupt Bread
        </p>
        <PostForm />
        <div className="posts">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Post);
