const express = require("express");
const contentrouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlelware/auth.middleware");
const blacklist = require("../middlelware/blacklist");
contentrouter.get("/content", auth, (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  res.send({ token, massage: "working fine" });
});
contentrouter.get("/tokenrefresh", (req, res) => {
  const rtoken = req.headers.authorization?.split(" ")[1];
  const decode=jwt.verify(rtoken,"masai")
  if(decode){
    const token=jwt.sign({email:"prashant@gmail.com"},process.env.SECRATEKEY,{expiresIn:60})
    res.send(token)
  }else{
    res.send("invailed refresh token")
  }
});

module.exports = contentrouter;
