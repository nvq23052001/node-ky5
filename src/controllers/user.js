import User from "../models/user";

class UserController {
  async userById(req, res, next, id) {
    try {
      const user = await User.findById(id).exec();
      if (!user) {
        res.json(400).json({
          status: "Fail",
          message: "Do not found user",
        });
      }

      req.profile = user;
      req.profile.password = undefined;
      next();
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.find({}).exec();
      res.json(user);
    } catch (error) {
      console.log(user);
    }
  }
}

export default new UserController();
