const express = require("express");
const { UserModel } = require("../Models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRouter = express.Router();
userRouter.use(express.json());

/*<><><><> User Register Part is here <><><><> */
userRouter.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const isUserPresent = await UserModel.find({ email });
    if (isUserPresent.length) {
      res.send({ msg: "User Already Registered, Please Login Now!!" });
    } else {
      bcrypt.hash(password, 4, (err, encrypted) => {
        if (err) {
          res.send("Some Error In Encrypting The Password!!");

          console.log("Some Error in Encrypting the passwoord!!", err);
        } else {
          const userData = new UserModel({ name, email, password: encrypted });
          userData.save();
          res.send({ msg: "User Registered Successfully!!!" });
        }
      });
    }
  } catch (err) {
    res.send({ msg: "Some Error In Registering the user!!!" });
    console.log("Some error in registering the user!!", err);
  }
});

/*<><><><> User Login Part is here <><><><> */
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserRegistered = await UserModel.find({ email });
    if (!isUserRegistered.length) {
      res.send({ msg: "Please Register first!!" });
      console.log("Please Register first!!!");
    } else {
      bcrypt.compare(password, isUserRegistered[0].password, (err, same) => {
        if (same) {
          const token = jwt.sign(
            { userID: isUserRegistered[0]._id },
            process.env.SECRET_KEY
          );
          res.send({ msg: "Login Successfull", token: token });
        } else {
          res.send({ msg: "Wrong Credentials!!!" });
          console.log("wrong Credentials");
        }
      });
    }
  } catch (err) {
    res.send("Some Error in login part !!!");
    console.log("Some error in login part!!!", err);
  }
});
module.exports = { userRouter };
