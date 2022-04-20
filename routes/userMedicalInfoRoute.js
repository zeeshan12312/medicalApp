const express = require("express");
const auth = require("../middleware/auth");
const { userMedicalInfoController } = require("../controllers");

const router = express.Router();

router.post("/medical-info/add/:id", userMedicalInfoController.addInfo);

module.exports = router;
