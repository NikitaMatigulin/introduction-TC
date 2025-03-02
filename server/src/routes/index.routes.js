const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const postRoutes = require("./post.routes");
const formatResponse = require("../utils/formatResponse");

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

router.use("*", (req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Not found", null, "Resource not found"));
});

module.exports = router;
