import ConnectToMongo from "@/middleware/ConnectToMongo";
import Profile from "@/models/profile";

var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const handler = async (req, res) => {
  if (req.method == "POST") {
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

      //creating profile
      const { fname, lname, email, age, resume, phoneNo } = JSON.parse(
        req.body
      );
      let success;
      console.log(req.user._id);
      let profile = new Profile({
        fname,
        lname,
        email,
        phoneNo,
        age,
        resume,
        user: req.user._id,
      });
      await profile.save();
      res.send({ message: "User Created", success: true });
    } catch (error) {
      return res.send({ error });
    }
  }
};

export default ConnectToMongo(handler);
