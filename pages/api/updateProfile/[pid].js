import ConnectToMongo from "@/middleware/ConnectToMongo";
import Profile from "@/models/profile";

var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      //verifyning token

      //creating profile
      const { fname, lname, email, age, resume, phoneNo } = JSON.parse(
        req.body
      );
      const saved = { fname, lname, email, age, resume, phoneNo };

      let profile = await Profile.findByIdAndUpdate(
        req.query.pid,
        { $set: saved },
      
      );

      console.log(profile);

      res.send({ message: "User updated", success: true });
    } catch (error) {
      return res.send({ error });
    }
  }
};

export default ConnectToMongo(handler);
