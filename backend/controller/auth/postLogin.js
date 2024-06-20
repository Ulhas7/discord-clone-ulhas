const User = require("../../models/user.js");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user is already registered
    const userexit = await User.findOne({ email:email.toLowerCase() });
    if (userexit&&(await bycrypt.compare(password, userexit.password))) {
      //send new token
      const token=jwt.sign({
        userId:userexit._id,
        email:userexit.email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );
      return res.status(200).json({
        userdetails:{
          _id:userexit._id,
          token:token,
          username:userexit.username,
          email:userexit.email
        }
      })
    }
    
    return res.status(201).send("Invalid credential");
  } catch (error) {
    return res.status(500).send("Error : please try again");
  }
};

module.exports = postLogin;
