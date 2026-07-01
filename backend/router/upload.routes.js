const express = require("express");
const upload = require("../middleware/upload");
const { uploadImage } = require("../controller/upload.controller");

const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.post("/image", authenticate, upload.single("image"), uploadImage);

module.exports = router;
