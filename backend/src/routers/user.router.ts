import { Router } from "express";
//import { sample_users } from "../data";
import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs'
import { User } from "../interfaces/User";


const router = Router();

/*
router.get("/seed", asyncHandler(async (req, res) => {
  const userCounts = await UserModel.countDocuments(); //presteje stevilo vnosov food v mongodb
  if (userCounts > 0){
    res.status(409).send("Seed is already done!");
    return;
  }

  await UserModel.create(sample_users);
  res.status(200).send("Seed is done!");
}));
*/

router.post("/login", asyncHandler(async(req, res) => {

  const {email, password} = req.body;
  const user = await UserModel.findOne({email , password});

  if (user && (await bcrypt.compare(password,user.password))){
    res.send(generateTokenResponse(user));
  }
  else {
    res.status(400).send("Username or password is not valid!");
  }

}));

router.post('/register', asyncHandler(
  async (req, res) => {
    const {name, email, password, address} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      res.status(400).send('User is already exist, please login!');
      return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    
    const newUser:User = {
      id:'',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false
    }
    
    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  }
))

const generateTokenResponse = (user:any) => {
  const token = jwt.sign({
    email: user.email,
    isAdmin: user.isAdmin
  }, "SomeRandomText", {
    expiresIn: "30d"
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token
  }
}

export default router;