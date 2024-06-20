const User = require("../../models/user.js");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if user is already registered
    const userexits = await User.findOne({ email:email.toLowerCase() });
    if (userexits) {
      return res.status(400).send("User already registered");
    }

    // encrypt password
    const encryptedPassword = await bycrypt.hash(password, 10);

    // create a new user an save in database
    const user = await User.create({ 
      email:email.toLowerCase(),
       password:encryptedPassword, 
       username
       });

    // create jwt token for registration
    const token=jwt.sign({
      userId:user._id,
      email:user.email,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );


    // send response
    return res.status(201).send({ 
      userDetails: {
        email:user.email,
        id:user._id,
        token:token,
        username:user.username,
      }
    });
  } catch (error) {
    return res.status(500).send("Errorplease try again");
  }
};

module.exports = postRegister;
