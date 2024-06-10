//controllers are functions that handle requests and responses
//i.e logic for the endpoints

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";

/*SIGN UP*/
export const signup = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;//These details we are getting from the frontend.

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword
            }
        )
        
    const user = await newUser.save();
    res.status(201).json(`Welcome ${user.firstName}`)
    }
        catch(err){
        console.log(err)
    }
}

/*SIGN IN*/

export const signin = async (req, res) => {
    const {email, password} = req.body
    try{
        const isExistingUser = await User.findOne({email: email})
        if(!isExistingUser){
            return res.status(401).json({msg: "User doesn't exist"})
        }
        else{
            const isPasswordMatch = await bcrypt.compare(password, isExistingUser.password)
            if(!isPasswordMatch){
                return res.status(401).json({msg: "Incorrect password"})
            }
            else{
                const token = jwt.sign({id: isExistingUser._id}, process.env.JWT_SECRET)
                 await delete isExistingUser.password
                res.status(200).json(token, isExistingUser)

        }
    }
}
    catch(err){
        console.log(err)
    }
}