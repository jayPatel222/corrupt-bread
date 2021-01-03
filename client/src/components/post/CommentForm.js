import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postid, addComment }) => {
  const [text, setText] = useState("");
  return (
    <div class="post-form">
      <form
        class="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postid, { text });
          setText("");
        }}
      >
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          name="text"
          value={text}
          placeholder="Comment here "
          required
        ></input>
        <input type="submit" class="btn btn-primary my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
