const jwt = require("jsonwebtoken");

const { blacklistModel } = require("../model/blacklist.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  let blacklist = await blacklistModel.findOne({ token });
  if (blacklist) {
    res.status(404).send({ error: "you are blocked login again" });
  } else {
    if (token) {
      try {
        jwt.verify(token, "masai", (err, decode) => {
          if (decode) {
            next();
          } else {
            res.status(404).send({ error: err.message });
          }
        });
      } catch (error) {
        res.status(404).send({ error });
      }
    } else {
      res.status(404).send({ error: "please enter token" });
    }
  }
};
module.exports = auth;
