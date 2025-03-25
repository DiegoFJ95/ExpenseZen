const express = require("express");
const router = express.Router();

router.get("/", (request, response, next) => {
    response.redirect("/dashboard/");
});

module.exports = router;