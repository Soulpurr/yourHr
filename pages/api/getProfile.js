import ConnectToMongo from "@/middleware/ConnectToMongo";
import Profile from "@/models/profile";

var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const handler = async (req, res) => {
  if (req.method == "GET") {
    try {
      //verifyning token
      const token = req.headers["token"];
      if (!token) {
        return res.send({ message: "Unknown access" });
      }
      let verification = jwt.verify(token, process.env.SECRET);
      if (verification) {
        req.user = verification.user;
      }

      //   getting profile
      let profile = await Profile.find({ user: req.user._id });
      res.send(profile);
    } catch (error) {
      return res.send({ error });
    }
  }
};

export default ConnectToMongo(handler);
