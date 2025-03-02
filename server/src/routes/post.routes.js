const postRoutes = require("express").Router();
const PostController = require("../controllers/PostController");
// const verifyAccessToken = require("../middleware/verifyAccessToken");

postRoutes.get("/", PostController.getAll);
postRoutes.get("/:id", PostController.getById);
postRoutes.post("/", PostController.create);
postRoutes.put("/:id", PostController.update);
postRoutes.delete("/:id", PostController.delete);

module.exports = postRoutes;
