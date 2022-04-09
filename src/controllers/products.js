import mongoose from "mongoose";
import Product from "../models/product";
class ProductController {
  async getAllProduct(req, res) {
    let page = req.query.page;
    const PAGE_SIZE = 5;
    if (page) {
      //! GET Pagination
      try {
        page = +page;
        let skipNumber = (page - 1) * PAGE_SIZE;
        const products = await Product.find({})
          .skip(skipNumber)
          .limit(PAGE_SIZE);
        res.json(products);
      } catch (error) {
        console.log(err);
      }
    } else if (req.query.sort) {
      //! SORT
      try {
        const products = await Product.find({}).populate("category").sort({
          price: req.query.sort,
        });

        res.json(products);
      } catch (err) {
        console.log(err);
      }
    } else if (req.body.q) {
      //! SEARCH
      const text = req.query.q;
      try {
        const productSearch = await Product.find({
          $text: { $search: text },
        });
        res.json(productSearch);
      } catch (error) {
        res.json({
          data: error,
        });
      }
    } else {
      //! GET ALL
      try {
        const products = await Product.find({}).populate("category").exec();

        res.json(products);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getProduct(req, res) {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id })
      .populate("category")
      .exec();
    res.json(product);
  }

  async createProduct(req, res) {
    console.log(req.files["image"][0]);
    console.log(req.files["imageDetail"]);
    try {
      const multiImage = req.files["imageDetail"].map((image) => {
        return image.path;
      });
      const product = await new Product({
        ...req.body,
        image: req.files["image"][0].path,
        imageDetail: multiImage,
      }).save();
      res.json(product);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete({
        _id: req.params.id,
      }).exec();
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(req, res) {
    try {
      const product = Product.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      ).exec();
      res.json(product);
    } catch (error) {
      res.status(400).json({
        message: "Delete product is fail",
      });
    }
  }

  async searchProduct(req, res) {
    const text = req.query.q;
    try {
      const productSearch = await Product.find({
        $text: { $search: text },
      });
      res.json(productSearch);
    } catch (error) {
      res.json({
        data: error,
      });
    }
  }
}

export default new ProductController();
