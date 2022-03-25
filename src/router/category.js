import Router from "express";

import Category from "../controllers/category";

const router = Router();

router.route("/category").get(Category.getAll).post(Category.create);

router
  .route("/category/:id")
  .delete(Category.remove)
  .put(Category.update)
  .get(Category.read);

export default router;
