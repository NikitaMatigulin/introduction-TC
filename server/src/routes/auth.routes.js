const authRoutes = require("express").Router();
const UserController = require("../controllers/UserController");
const verifyRefreshToken = require("../middleware/verifyRefreshToken");

authRoutes
  .get("/refreshTokens", verifyRefreshToken, UserController.refreshTokens)
  .post("/signUp", UserController.signUp)
  .post("/signIn", UserController.signIn)
  .get("/signOut", UserController.signOut)
  .get("/", UserController.getAll)
  .get("/:id", UserController.getById);

module.exports = authRoutes;
