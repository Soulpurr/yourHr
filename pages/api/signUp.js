import ConnectToMongo from "@/middleware/ConnectToMongo";
import User from "@/models/user";
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { fname, lname, email, isAdmin, password } = JSON.parse(req.body);

      const secPass = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET
      ).toString();
      let user = new User({
        fname: fname,
        lname: lname,
        email: email,
        isAdmin: isAdmin,
        password: secPass,
      });
      let savedUser = await user.save();
      let token = await jwt.sign({ user: savedUser }, process.env.SECRET, {
        expiresIn: "7d",
      });
      return res
        .status(200)
        .send({ message: "User created", success: "true", token: token });
    } catch (error) {
      res.send({ message:error, success: false });
    }
  }

  return res.status(400).send({message:"Not allowwd"});
};

export default ConnectToMongo(handler);
