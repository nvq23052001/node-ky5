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
    },
    image: {
      type: String,
    },
    imageDetail: {
      type: Array,
    },
    description: {
      type: String,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    status: {
      type: Number,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text" });

export default mongoose.model("Product", productSchema);
