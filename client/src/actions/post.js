import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from "./types";

//GET Post
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.responseText, status: err.response.status },
    });
  }
};

export const addLike = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postid}`);

    dispatch({ type: UPDATE_LIKES, payload: { postid, likes: res.data } });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.responseText, status: err.response.status },
    });
  }
};
export const removeLike = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postid}`);

    dispatch({ type: UPDATE_LIKES, payload: { postid, likes: res.data } });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.responseText, status: err.response.status },
    });
  }
};
export const deletePost = (postid) => async (dispatch) => {
  try {
    if (window.confirm("Are you sure you want to remove this post ?")) {
      await axios.delete(`/api/posts/${postid}`);

      dispatch({ type: DELETE_POST, payload: postid });
      dispatch(setAlert("Post Removed", "success"));
    } else {
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.responseText, status: err.response.status },
    });
  }
};
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/posts`, formData, config);

    dispatch({ type: ADD_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.responseText },
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.responseText, status: err.response.status },
    });
  }
};

export const addComment = (postid, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comments/${postid}`,
      formData,
      config
    );

    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.responseText },
    });
  }
};
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comments/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.responseText, status: err.response.status },
    });
  }
};
