const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const { findById } = require("../../models/User");
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is Required").not().isEmpty(),
      check("subject", "Subject is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        user: req.user.id,
        name: user.name,
        text: req.body.text,
        subject: req.body.subject,
        avatar: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route  GET Api/posts
// @desc   Test route
// @access  Public

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    onsole.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (!posts) {
      return res.status(400).send({ msg: "Post not found" });
    }
    res.json(posts);
  } catch (error) {
    console.log(error.message);

    if (error.kind === "ObjectId") {
      return res.status(400).send({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send({ msg: "Post not found" });
    }

    if (post.user === req.user.id) {
      await post.remove();
      res.json({ msg: "Post deleted" });
    } else {
      return res.status(500).send({ msg: "Auth not granted" });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).send({ msg: "Post not found" });
    }
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length == 0
    ) {
      return res.status(400).json({ msg: "Post not liked anyways" });
    }
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/comments/:id",
  [auth, [check("text", "Text is Required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);
router.delete("/comments/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id == req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "No comment found" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
