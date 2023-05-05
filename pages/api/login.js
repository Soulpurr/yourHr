import ConnectToMongo from "@/middleware/ConnectToMongo";
import User from "@/models/user";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { email, password } = JSON.parse(req.body);
      let success;
      let user = await User.findOne({ email: email });

      if (user) {
        var pass = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
        let secPass = pass.toString(CryptoJS.enc.Utf8);
        if (secPass == password) {
          success = true;
          let token = await jwt.sign({ user: user }, process.env.SECRET, {
            expiresIn: "7d",
          });

          return res
            .status(200)
            .send({ token, success, isAdmin: user.isAdmin });
        }
        success = false;
        return res
          .status(200)
          .send({ success: success, message: "Invalid credentials" });
      }
      return res.send({ message: "User doesnt exist", success: false });
    } catch (error) {
      return res.status(200).send({ message:error });
    }
  }
};

export default ConnectToMongo(handler);
