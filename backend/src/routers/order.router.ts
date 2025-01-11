import {Router} from 'express';
import asyncHandler from 'express-async-handler'
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../constants/order_status';
import auth from '../middlewares/auth.mid';
import { AnyExpression } from 'mongoose';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { User } from '../interfaces/User';

const router = Router();
router.use(auth);

router.post('/create',
asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;

    if(requestOrder.items.length <= 0){
        res.status(HTTP_BAD_REQUEST).SEND('Cart Is Empty!');
        return;
    }

    /*
    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });
    */

    const newOrder = new OrderModel({...requestOrder, user: req.user.id});
    await newOrder.save();
    res.send(newOrder);
})
)

router.get('/newOrderForCurrentUser', asyncHandler( async (req:any,res) => {

    const order = await OrderModel.findOne({user: req.user.id, status: OrderStatus.NEW}).sort({ createdAt: -1 });
    if(order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
}));

router.get('/allOrdersForCurrentUser', asyncHandler(async (req: any, res) => {
    const orders = await OrderModel.find({ user: req.user.id, status: OrderStatus.NEW }).sort({ createdAt: -1 }); // Sort by createdAt in descending order, get all

    res.send(orders); // Send all the orders

}));


router.get('/user', asyncHandler(async (req: any, res) => {
    const userId = req.user.id; // Extract from `req.user` set by auth middleware
  
    const user = await UserModel.findById(userId).select('-_id -password -isAdmin -createdAt -updatedAt -__v');; // Exclude sensitive fields like password
    if (!user) {
        res.status(404).send({ message: 'User not found' });
    }
  
    res.send(user);
}));

router.put('/user-update', asyncHandler(async (req: any, res: any) => {
    const userId = req.user.id;  // Extracting user ID from the authenticated request
    const { name, email, password, address } = req.body;

    // Find the user to update
    const user = await UserModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password needs to be updated
    if (password) {
        // Encrypt the new password using bcrypt
        const encryptedPassword = await bcrypt.hash(password, 10);
        user.password = encryptedPassword;  // Update the password
    }

    // Update other fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;

    // Save the updated user data
    await user.save();

    const updatedUser:User = {
        id:user.id,
        name:user.name,
        email: user.email.toLowerCase(),
        password: user.password,
        address: user.address,
        isAdmin: user.isAdmin
    }

    // Return the updated user data (excluding password)
    res.send(generateTokenResponse(updatedUser));

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