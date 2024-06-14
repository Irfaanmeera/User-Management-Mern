import Admin from '../models/adminModel.js'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';

export const adminLogin = async (req,res,next)=>{
    console.log(req.body)
    const {name,password}= req.body;
    try{
        const admin = await Admin.findOne({ name });
        if (!admin) return next(errorHandler(404, "Admin not found"));
        
        if (password !==admin.password) return next(errorHandler(403, "Wrong credentials"));
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
        const { password: _, ...rest } = admin._doc;
        const expiryDate = new Date(Date.now() + 360000);
        res
          .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
          .status(200)
          .json(rest);
    }catch(error){
        console.log(error)
    }
}

export const adminLogout = (req, res) => {
    res.clearCookie("access_token").status(200).json("Signout Success");
  };

export const adminHome =async (req,res)=>{
    try {
        const users = await User.find().sort({_id:-1})
        res.status(200).json(users);
      } catch (error) {
        console.log(error);
      }
    };

  


