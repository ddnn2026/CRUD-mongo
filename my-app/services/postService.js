const postModel = require("../models/Post");

exports.getPost = async () => {
  return await postModel.find();
};

exports.getPostById = async (id) => {
  return await postModel.findById(id);
};

exports.createPost = async (post) => {
  return await postModel.create(post);
};

exports.updatePostById = async (id, post) => {
  return await postModel.findByIdAndUpdate(id, post);
};

exports.deletePost = async (id) => {
  return await postModel.findByIdAndDelete(id);
};
