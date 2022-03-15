import mongoose from "mongoose";
import Product from "../models/product";
// import Product from mongoose.model("Product", { name: String });

class ProductController {
  async getAllProduct(req, res) {
    try {
      const products = await Product.find({}).exec();
      res.json(products);
    } catch (err) {
      console.log(err);
    }
  }

  async getProduct(req, res) {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id }).exec();
    res.json(product);
  }

  async createProduct(req, res) {
    try {
      const product = await new Product(req.body).save();
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
      res, json(product);
    } catch (error) {
      res.status(400).json({
        message: "Delete product is fail",
      });
    }
  }
}

export default new ProductController();
