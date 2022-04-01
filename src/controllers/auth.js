import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
class AuthController {
  async signup(req, res) {
    try {
      const { email, name, password } = req.body;
      const existEmail = await User.findOne({ email }).exec();

      if (existEmail) {
        res.status(400).json({
          status: "error",
          message: "Email was exist",
        });
      }
      const user = await new User({ email, name, password }).save();
      res.json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      res.json({
        message: "Tạo user không thành công",
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).exec();

      if (!user) {
        res.status(400).json({
          status: "Invalid",
          message: "Email k  ton tai",
        });
      }

      if (!user.authenticate(password)) {
        res.status(400).json({
          status: "Invalid",
          message: "Mk k dung",
        });
      }

      const token = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: error,
      });
    }
  }
}

export default new AuthController();
