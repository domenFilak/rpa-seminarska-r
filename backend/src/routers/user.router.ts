import { Router } from "express";
//import { sample_users } from "../data";
import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs'
import { User } from "../interfaces/User";
import auth from '../middlewares/auth.mid';


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
  const user = await UserModel.findOne({email});

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

router.post('/emailExists', asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).send('Email is required');
    return;
  }

  const user = await UserModel.findOne({ email });
  if (user) {
    res.send({ exists: true });
  } else {
    res.send({ exists: false });
  }
}));

router.post('/updatePassword', asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    console.log('Missing email or password');
    res.status(400).json({ error: 'Email and new password are required' });
    return;
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    console.log(`User with email ${email} not found`);
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const encryptedPassword = await bcrypt.hash(newPassword, 10);
  user.password = encryptedPassword;
  await user.save();

  console.log(`Password for ${email} updated successfully`);
  res.status(200).json({ message: 'Password updated successfully' });
}));


const generateTokenResponse = (user:any) => {
  const token = jwt.sign({
    id: user.id, email: user.email,
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