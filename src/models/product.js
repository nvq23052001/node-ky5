import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Types;

const productSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
      minLength: 5,
      required: true,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text" });

export default mongoose.model("Product", productSchema);
