const User = require("../models/User");
const { generateHash, compareHash } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

const registerUser =  async (req,res)=>{
    const {name, email, password,confirmPassword} = req.body;
    if(!name || !email || !password || !confirmPassword)
        return res.status(404).json({message:"Invalid data, must required email , name , password ,confirmPassword"});

    if(confirmPassword !== password){
        return res.status(400).json({message:"password and confirm password does not matched"})
    }
    try{
        const existing_user = await User.findOne({email});
        if(existing_user)
            return res.status(409).json({message:"email already exist"});

        const hashedPassword = generateHash(password);
        if(!hashedPassword)
            return res.staus(500).json({message:"password not hashed"})
        const new_user = new User({
            name,
            email,
            password:hashedPassword
        });

        
        const saved_user = await new_user.save();
        return res.status(201).json({message:"user register successfully",saved_user});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
};


const loginUser = async (req,res)=>{
    const {email , password:reqPassword} = req.body;
    if(!email || !reqPassword)
        return res.status(404).json({message:"invalid data. email , password not found"});

    try{
        const user = await User.findOne({email});
        if(!user)
            return res.status(401).json({message:"wrong credentials"});
        const isCorrectPassword = compareHash(reqPassword,user.password)

        if(!isCorrectPassword)
            return res.status(401).json({message:"wrong credentials"});
        const { password, ...others } = user.toObject();
        const token = generateToken({userId:user._id});
        return res.cookie("token",token).status(200).json({message:"user logged in successfully",data:others})
    }catch(error){
        console.log(error,"LOGIN USER ERROR");
        return res.status(500).json({message:"internal server error"})
    }
}

module.exports ={
    registerUser,
    loginUser
}