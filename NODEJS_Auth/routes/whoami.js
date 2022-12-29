const express = require("express");
const router = express.Router();

const { me: whoami } = require("../controller/whoamiController");
const auth = require("../middleware/auth");

router.get("/", auth, whoami);

module.exports = router;
