import mongoose from "mongoose";
import Category from "../models/category";
import Product from "../models/product";
class CategoryController {
  async create(req, res, next) {
    try {
      const category = await new Category(req.body).save();
      res.json(category);
    } catch (error) {
      res.status(400).json({
        message: "Error",
      });
    }
  }

  async getAll(req, res, next) {
    try {
      const category = await Category.find().exec();
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({
        message: "Err",
      });
    }
  }

  async remove(req, res, next) {
    try {
      const category = await Category.findOneAndDelete({
        _id: req.params.id,
      }).exec();
      res.json(category);
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res, next) {
    try {
      const category = await Category.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body
      ).exec();
      res.json(category);
    } catch (error) {
      console.log(error);
    }
  }

  async read(req, res) {
    let page = req.query.page;
    const PAGE_SIZE = 5;

    const condition = { _id: req.params.id };
    const category = await Category.findOne(condition).exec();

    if (page) {
      //! GET Pagination
      try {
        page = +page;
        let skipNumber = (page - 1) * PAGE_SIZE;
        const products = await Product.find({ category })
          .select("-category")
          .skip(skipNumber)
          .limit(PAGE_SIZE);

        res.json({
          category,
          products,
        });
      } catch (error) {
        console.log(err);
      }
    } else {
      try {
        const products = await Product.find({ category })
          .select("-category")
          .exec();
        res.json({
          category,
          products,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export default new CategoryController();
