const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register the user
//@api POST /api/auth/register
//@access public
const registerUser = asyncHandler(async(req, res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists!");
    }

    //Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password: ", hashedPassword);

    const user = await User.create({
        username, email, password: hashedPassword
    });

    if(user){
        res.status(201).json({_id: user.id, username: user.username, email: user.email});
    }else{
        res.status(400);
        throw new Error("User data is invalid!");
    }
});

//@desc Login the user
//@api POST /api/auth/login
//@access public
const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({email});
    //comparing password with hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
    )
    res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or password is invalid");
    }
});

//@desc Current user information
//@api GET /api/auth/current
//@access private
const currentUser = asyncHandler(async(req, res)=>{
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser};