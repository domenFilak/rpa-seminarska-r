import {Router} from 'express';
import asyncHandler from 'express-async-handler'
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../constants/order_status';
import auth from '../middlewares/auth.mid';
import { AnyExpression } from 'mongoose';

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

export default router;