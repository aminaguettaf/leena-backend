import userModel from "../models/UserModel.js";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async(req,res)=>{
    const{name, email, password} = req.body;
    try {
        const isExist = await userModel.findOne({email});
        if(isExist){
            return res.json({success: false, message:'User already exists'});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:'You should enter a valid email'});
        }
        if(password.length < 8){
            return res.json({success:false, message:'You should enter a strong password'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save();
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({success: true, message:'You have register', token});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

const login = async(req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:'User doesnt exist, you should register first'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message:'Incorrect password'});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({success: true, message: 'You logged in', token});
    } catch (error) {
        res.json({success:false, message:error.message});
    } 
}

export {register, login}