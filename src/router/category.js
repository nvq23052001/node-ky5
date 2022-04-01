import Router from "express";

import Category from "../controllers/category";
import user from "../controllers/user";

import {
  checkAuth,
  isAdmin,
  isAuth,
  requiredSigin,
} from "../middlewares/checkAuth";

const router = Router();

router
  .route("/category/:userId")

  .get(Category.getAll)
  .post(requiredSigin, isAuth, isAdmin, Category.create);

router
  .route("/category/:id/:userId")
  .delete(requiredSigin, isAuth, isAdmin, Category.remove)
  .put(requiredSigin, isAuth, isAdmin, Category.update)
  .get(Category.read);

// Author
router.param("userId", user.userById);

export default router;
