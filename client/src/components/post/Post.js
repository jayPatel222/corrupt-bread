import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PostItem from "../posts/PostItem";
import CommentItem from "./CommentItem";
import { getPost } from "../../actions/post";
import CommentForm from "./CommentForm";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
    console.log("Here !");
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <p>Loading</p>
  ) : (
    <Fragment>
      <Link to="/posts" className="btn btn-primary">
        Back to feed
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postid={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
