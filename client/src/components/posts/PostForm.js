import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    subject: "",
    text: "",
  });

  const mystyle = {
    marginTop: "10px",
    fontFamily: "Arial",
  };

  const { subject, text } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    setFormData({ subject: "", text: "" });
  };
  return (
    <div className="post-form">
      <form class="form my-1 card" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title "
            name="subject"
            value={subject}
            onChange={(e) => onChange(e)}
            required
          />
          <textarea
            style={mystyle}
            onChange={(e) => onChange(e)}
            name="text"
            cols="30"
            rows="3"
            value={text}
            placeholder="Create a post "
            required
          ></textarea>
          <input type="submit" class="btn btn-primary my-1" value="Submit" />
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
