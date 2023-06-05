import express from "express";
const router = express.Router()
import { login, register } from "../controllers/authController.js";
import bcrypt from "bcryptjs"

////// REGISTER
router.post("/register", register)

///////SIGNIN
router.post("/login", login);

//////// VERIFICATION
router.get("/token", (req, res)=>{
    
})








export default router