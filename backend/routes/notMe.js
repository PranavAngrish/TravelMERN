const express = require("express");
const { show, confirm } = require("../controllers/notMeController");

const router = express.Router();
router.use(express.urlencoded({ extended: false, limit: "2kb" }));
router.get("/", show);
router.post("/", confirm);

module.exports = router;
