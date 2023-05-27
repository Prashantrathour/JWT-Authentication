const express = require("express");
const { model } = require("mongoose");
const userrouter = express.Router();
const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("../middlelware/auth.middleware");
const { blacklistModel } = require("../model/blacklist.model");

userrouter.post("/register", async (req, res) => {
  const { password, name, age, email } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).send({ error: "something went wrong in hashing" });
      } else {
        const userauth = { name: name, email: email, age: age, password: hash };
        const user = new userModel(userauth);
        await user.save();
      }
    });

    res.send("recorded");
  } catch (error) {
    res.send(404).json({ error: error });
  }
});
userrouter.post("/login", async (req, res) => {
  const { password, email } = req.body;
  try {
    const userfind = await userModel.findOne({ email: email });

    if (userfind) {
      bcrypt.compare(password, userfind.password, async (err, result) => {
        if (err) {
          res.status(404).send(err);
          return;
        }
        if (result) {
          const token = jwt.sign({ emai: "prashant@gmail.com"}, process.env.SECRATEKEY, {
            expiresIn: 60,
          });
          const rtoken = jwt.sign({ emai: "prashant@gmail.com"}, process.env.SECRATEKEY, {
            expiresIn: 240,
          });
          res.json({ token,rtoken, message: "login successfull" });
        } else {
          res
            .status(400)
            .send({ error: `something went wrong in hashing ${err}` });
        }
      });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.send(404).json({ error: error });
  }
});
userrouter.get("/logout", auth, async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      let blacklist = new blacklistModel({token});
      blacklist.save()

    //   blacklist.push(token);
      res.send({ msg: "logout" });
    } catch (error) {
      res.status(404).send(error);
    }
  } else {
    res.json({ msg: "please login again" });
  }
});

module.exports = { userrouter };
