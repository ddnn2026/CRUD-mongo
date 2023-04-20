const express = require("express");

const postController = require("../controllers/postController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/hello", isAuth, postController.hello);

router
  .route("/")
  .get(isAuth, postController.getAllPost)
  .post(isAuth, postController.createPost);

router
  .route("/:id")
  .put(isAuth, postController.updatePost)
  .get(isAuth, postController.getById)
  .delete(isAuth, postController.deletePost);

module.exports = router;
