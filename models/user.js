const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      default: "Male",
    },
  },

  {
    collection: "Users",
    timestamps: true, // inserts createdAt and updatedAt
  }
);
userSchema.methods.getAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
function validateUser(user) {
  schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    city: Joi.string(),
    country: Joi.string(),
  });
  return schema.validate(user);
}

function validateLogin(user) {
  schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(user);
}

const User = mongoose.model("User", userSchema);
module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;
module.exports.User = User;
