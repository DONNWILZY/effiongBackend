import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../errormgt/error.js";
import jwt from "jsonwebtoken";


////////// REGISTER AUTH
export const register = async(req, res, next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password)
        const newUser = new User({
           ...req.body,
           // username: req.body.username,
           // email: req.body.email,
            password: hash
        });

    await newUser.save();
    res.json({
        status: 200,
        message: "User has been created successfully",
        data: newUser
    })
    }catch(err){
        next(err)
    }

}

/////////LOGIN
export const login = async (req, res, next)=>{

    try{
        const user = await User.findOne({username: req.body.username}) 
       // const userEmail = await User.findOne({email: req.body.email}) 
        if (!user) 
             return next(createError(404, "USER NOT FOUND!"))

        const IsPasswordCoorect = await bcrypt.compare(req.body.password, user.password)
        if (!IsPasswordCoorect)
            return next(createError(400, "wrong Password"))

            /////if password is correct create new web token
            const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT_TOKEN)

            ////////// KEEP PASSWORD & ADMIN STATUS FROM DATABASE, WHIE SHOWING OTHER DETAILS
            const {password, isAdmin, ...otherDetails} = user._doc

           res.cookie("access_token", token, {
            ////// restricting client request to acces the cooke
            httpOnly:true
           }).json({
            status: 200,
            message: "succesfully loggin",
            data: {deatils: {...otherDetails}}
           })
           
            /*
        res.cookie("access_token", token, {

        }).status(200).json({...otherDetails})
        */
    
    }catch(err){
        next(err); 
    }
}