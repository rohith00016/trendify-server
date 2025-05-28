const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (value) {
          return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
        },
        message:
          "Password must be at least 8 characters long and include at least 1 numeric digit and 1 capital letter",
      },
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value);
        },
        message: "Mobile number must be exactly 10 digits",
      },
    },
    shippingAddress: {
      city: { type: String },
      street: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
