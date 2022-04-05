import expressJWT from "express-jwt";
import dotenv from "dotenv";

dotenv.config();

export const checkAuth = (req, res, next) => {
  const isAdmin = true;
  if (isAdmin) {
    next();
  } else console.log("Get out");
};

export const requiredSigin = expressJWT({
  algorithms: ["HS256"],
  secret: process.env.ACCESS_TOKEN_SECRET,
  requestProperty: "auth", //! req.auth
});

export const isAuth = (req, res, next) => {
  console.log(req.profile);
  console.log(req.auth);

  const status = req.profile._id == req.auth._id;
  if (!status) {
    return res.redirect("/");
    // res.status(401).json({
    //   status: "Invalid",
    //   message: "You do not have access to this function ",
    // });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (!req.profile.role == 0) {
    return res.redirect("/");
  }
  next();
};
