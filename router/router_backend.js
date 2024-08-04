const express = require("express");
const { verify } = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../controllers/backend/index");

//------MIDDLEWARE-----//
const { verify_session } = require("../middleware/verify_session_token");

// ROUTER
const router = express.Router();

router.get("/Backend/", [verify_session], controllers.Backend_area);

module.exports = router;
