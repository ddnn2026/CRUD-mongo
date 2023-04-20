const postService = require("../services/postService");

exports.hello = (req, res) => {
  res.json({
    data: "hello",
  });
};

exports.getAllPost = async (req, res) => {
  try {
    const post = await postService.getPost();
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.json({ data: post, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body);
    res.json({ data: post, status: "Create Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await postService.updatePostById(req.params.id, req.body);
    res.json({ data: post, status: "Update Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await postService.deletePost(req.params.id);
    res.json({ message: `Delete post id ${req.params.id}`, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};