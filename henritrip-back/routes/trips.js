const express = require("express");
const router = express.Router();

const controller = require("../controllers/trips");

router.post("/", controller.createTrip);

//router.post("/login", controller.login);

module.exports = router;
