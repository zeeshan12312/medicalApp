const bcrypt = require("bcryptjs");
const { User, validateUser, validateLogin } = require("../models/user");
const mongoose = require("mongoose");

//Create User
exports.createUser = async (req, res) => {
  const body = req.body;
  const { error } = validateUser(body);
  if (error) return res.status(400).send(error.details[0].message);
  let createNewUser = await User.findOne({
    email: body.email,
  });
  hashPassword = await bcrypt.hash(body.password, 10);

  if (!createNewUser) {
    createNewUser = new User(body);
    createNewUser.password = hashPassword;
    const result = await createNewUser.save();
    const token = createNewUser.getAuthToken();
    result.token = token;
    res.status(200).send({
      _id: result._id,
      name: createNewUser.name,
      phone: createNewUser.phone,
      email: createNewUser.email,
      password: createNewUser.password,
      token,
    });
  } else {
    res.status(400).send("User already exist");
  }
};

//Login User
exports.login = async (req, res) => {
  const body = req.body;
  const { error } = validateLogin(body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({
    email: body.email,
  });
  if (!user) return res.status(400).send("User not found");

  hashPassword = await bcrypt.compareSync(body.password, user.password);
  if (!hashPassword) return res.status(400).send("Invalid user details");
  const token = user.getAuthToken();
  res
    .status(200)
    .send({ _id: user._id, token: token, name: user.name, email: user.email });
};

// Users List
exports.getAllUsers = async (req, res) => {
  const users = await User.aggregate([{ $sort: { createdAt: -1 } }]);
  const userslist = [];
  users.forEach((allusers) => {
    userslist.push(allusers);
  });
  res.status(200).send(userslist);
};

// User Details
exports.getUserDetails = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid user _id");

  let user = await User.findById(req.params.id);

  if (!user) return res.status(400).send("User not Exist");
  res.status(200).send(user);
};

//Edit User
exports.editUser = async (req, res) => {
  const body = req.body;
  let user = await User.findOne({
    _id: req.params.id,
  });

  if (user) {
    user = new User(body);
    if (body.password) {
      hashPassword = await bcrypt.hash(body.password, 10);
      user.password = hashPassword;
    }
    const result = await User.updateOne({ _id: req.params.id }, body);
    res.status(200).send({
      user,
    });
  } else {
    res.status(400).send("Invalid ID");
  }
};
