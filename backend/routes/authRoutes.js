const express = require("express");
const router = express.Router();
const authControllers = require("../controller/auth/authControllers.js");
const joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth.js");
const registerSchema = joi.object({
  username: joi.string().min(3).max(12).required(),
  password: joi.string().min(6).max(12).required(),
  email: joi.string().email().required(),
});

const loginSchema = joi.object({
  password: joi.string().min(6).max(12).required(),
  email: joi.string().email().required(),
});
router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

// test route to verfy if our midleware is working
router.get('/test',auth,(req,res) => {
  res.send("request passed");
})

module.exports = router;
