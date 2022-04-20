const mongoose = require("mongoose");
const config = require("config");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    height: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    suger: {
      type: String,
      enum: ["no", "yes"],
      default: "no",
    },
    bp: {
      type: String,
      enum: ["no", "yes"],
      default: "no",
    },
    blood_group: {
      type: String,
      default: "NA",
    },
    alargies: {
      type: String,
      default: "no",
    },
  },

  {
    collection: "userMdeicalInfo",
    timestamps: true, // inserts createdAt and updatedAt
  }
);

const userMdeicalInfo = mongoose.model("userMdeicalInfo", userSchema);

module.exports.userMdeicalInfo = userMdeicalInfo;
