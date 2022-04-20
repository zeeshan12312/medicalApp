const express = require("express");
const auth = require("../middleware/auth");
const { userController, chatController } = require("../controllers");

const router = express.Router();

router.post("/user/create-user", userController.createUser);
router.post("/user/login", userController.login);
router.get("/user/allusers", userController.getAllUsers);
router.post("/user/chat/", chatController.startChat);
router.get("/user/:id", userController.getUserDetails);
router.post("/user/edit/:id", auth, userController.editUser);
module.exports = router;
