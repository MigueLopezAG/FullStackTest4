const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const fetch = require("isomorphic-fetch");

module.exports.isLoggedIn = asyncHandler(async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401);
    throw new Error("User not login");
  } else {
    next();
  }
});
module.exports.isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.userType !== "Admin") {
    res.status(401);
    throw new Error("You dont have permisison to do this");
  } else {
    next();
  }
});
//Se crea una nueva validacion para validar si el usuario es un proveedor
module.exports.isAdviser = asyncHandler(async (req, res, next) => {
  if (req.user.userType === "Adviser" || req.user.userType === "Admin") {
    next()
  } else {
    res.status(401);
    throw new Error("You dont have permisison to do this");
  }
});

module.exports.validCaptchaToken = async (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    next();
  } else {
    next();
  }
};
