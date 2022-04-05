import mongoose from "mongoose";
import Product from "../models/product";
// import Product from mongoose.model("Product", { name: String });

class ProductController {
  async getAllProduct(req, res) {
    let page = req.query.page;
    const PAGE_SIZE = 5;
    if (page) {
      //! GET PAGE
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
    try {
      const product = await new Product(req.body).save();
      console.log(req.body);
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
    console.log(text);
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
