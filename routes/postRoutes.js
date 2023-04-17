const express = require("express");

const postController = require("../controllers/postController");

const router = express.Router();

router.get("/hello", postController.hello);

router
  .route("/")
  .get(postController.getAllPost)
  .post(postController.createPost);

router
  .route("/:id")
  .put(postController.updatePost)
  .get(postController.getById)
  .delete(postController.deletePost);

module.exports = router;
