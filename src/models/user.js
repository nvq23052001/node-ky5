import mongoose from "mongoose";
import { createHmac } from "crypto";
import { v4 as uuidv4 } from "uuid";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: 32,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  authenticate(password) {
    return this.password === this.encryptPassword(password);
  },

  encryptPassword(password) {
    if (!password) return;
    try {
      return createHmac("sha256", this.salt).update(password).digest("hex");
    } catch (error) {
      console.log(error);
    }
  },
};

userSchema.pre("save", function (next) {
  this.salt = uuidv4();
  this.password = this.encryptPassword(this.password);
  next();
});

export default mongoose.model("User", userSchema);
