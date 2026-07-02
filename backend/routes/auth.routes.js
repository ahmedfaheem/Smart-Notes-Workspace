const express = require('express');

const router = express.Router();

const {register, login, getMe} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth")
const { registerSchema, loginSchema } = require("../validators/auth");
const validate = require("../middlewares/validate");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/me",authMiddleware, getMe);

module.exports = router;