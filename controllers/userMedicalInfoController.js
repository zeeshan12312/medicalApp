const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { userMdeicalInfo } = require("../models/userMedicalInfo");
const { User } = require("../models/user");
//Add User Info
exports.addInfo = async (req, res) => {
  const body = req.body;

  let user = await User.findOne({
    _id: req.params.id,
  });

  let medicalIn = await userMdeicalInfo.findOne({
    _id: req.params.id,
  });
  if (user) {
    if (!medicalIn) {
      medicalInfo = new userMdeicalInfo(body);
      const result = await medicalInfo.save();
      res.status(200).send({
        result,
      });
    } else {
      const result = await userMdeicalInfo.updateOne(
        { _id: req.params.id },
        body
      );
    }
  } else {
    res.status(404).send("No user against this id");
  }
  res.status(200).send("Connection");
};
