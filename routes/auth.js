const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.put("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/getClientStatus", isAuth, (req, res, next) => {
  //Works fine
  res.status(200).json({ message: "Succesfully authenticated" });
});

module.exports = router;
