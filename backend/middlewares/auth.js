const jwt = require("jsonwebtoken");


const authMiddleware = async (req, res, next)=>{
    const authHead = req.headers.authorization;
    if(!authHead){
        return res.status(400).json({
            sucess:false,
            message:"Must Provide Token"
        })
    }

    if(!authHead.startsWith("Bearer ")){
        return res.status(401).json({
            sucess:false,
            message:"Invalid Token format"
        })
    }
    
    const token = authHead.split(" ")[1];
    try{
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = decoded;

      return next();
    }catch(e){
        return res.status(401).json({
            sucess:false,
            message:"Invalid Token Or Expired"
        })
    }
}

module.exports = authMiddleware;