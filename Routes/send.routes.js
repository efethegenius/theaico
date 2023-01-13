const { moduleExpression } = require("@babel/types");
const express = require("express");
const router = express.Router();

const { response } = require("../Controllers/send");

router.get("/sending", response);

module.exports = router;
