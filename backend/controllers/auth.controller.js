const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const register = asyncHandler(async (req, res) => {
  
    const { name, email, password } = req.body;

   

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });


    return res
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        user: { name: newUser.name, email: newUser.email },
      });
  
   

});

const login = asyncHandler(async (req, res) => {
  
    const { email, password } = req.body;

  
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
    const payload = {
      id: user._id,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    return res.json({
      success: true,
      token,
    });
  
});


const getMe = asyncHandler(async (req, res)=>{
      
    const userID = req.user.id;
    
    if(!userID){
      res.status(401);
        throw new Error("User ID not found ");
    }
    
    const user = await User.findById(userID).select("-password");

    if(!user){
      res.status(404);
        throw new Error("User not found");
    }

    return res.json({ success: true, user });

   

});
module.exports = {
  register,
  login,
  getMe
};
