import Router from "express";
import express from "express";
import multer from "multer";
import path from "path";
import {
  checkAuth,
  isAdmin,
  isAuth,
  requiredSigin,
} from "../middlewares/checkAuth";
import products from "../controllers/products";
import user from "../controllers/user";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
const cpUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "imageDetail", maxCount: 4 },
]);

router
  .route("/products")
  .get(products.getAllProduct)
  .post(cpUpload, products.createProduct);

router.route("/products/:userId");
// .post(upload.single("productImage"), products.createProduct);
// .post(requiredSigin, isAuth, isAdmin, products.createProduct);

router
  .route("/product/:id/:userId")
  .delete(requiredSigin, isAuth, isAdmin, products.deleteProduct);

router.route("/product/status/:id").put(products.updateStatusProduct);
router.route("/product/:id").put(cpUpload, products.updateProduct);

//  GET Trash products
router.route("/product/trash").get(products.trashProduct);
router.route("/product/:id/:userId/restore").patch(products.restoreProduct);

// //DELETE product
router.route("/product/force/:id/:userId").delete(products.forceProduct);

router.route("/product/:id").get(products.getProduct);

// Author
router.param("userId", user.userById);

// Search
router.route("/products/search").get(products.searchProduct);

export default router;
