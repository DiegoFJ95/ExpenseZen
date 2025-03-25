// const { response } = require("express");
const Model = require("../models/dashboard.model");


exports.get_dashboard = (request, response, next) => {
    response.render("dashboard");
};