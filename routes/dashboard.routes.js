const express = require("express");
const router = express.Router();
const csrf = require("csurf");
// const csrfProtection = csrf();
// router.use(csrfProtection)
const controladores = require("../controllers/dashboard.controller");


router.get("/", controladores.get_dashboard);

module.exports = router;
