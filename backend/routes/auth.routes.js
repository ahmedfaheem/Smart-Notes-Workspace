const express = require('express');

const router = express.Router();

const {register, login, getMe, editUserName} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth")
const { registerSchema, loginSchema } = require("../validators/auth");
const validate = require("../middlewares/validate");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me",authMiddleware, getMe);
router.put('/me', authMiddleware, editUserName);
module.exports = router;