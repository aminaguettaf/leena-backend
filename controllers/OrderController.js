import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";

const placeOrder = async(req, res)=>{
    try {
        const {userId, items, amount,  userInfos} = req.body;
        
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            userInfos,
            paymentMethod: 'Cash on delivery',
            payment: false,
            date: Date.now()
        })
        await newOrder.save();
        
        await userModel.findByIdAndUpdate(userId, {cart:{}});
        res.json({success: true, message: 'Order placed'});
    } catch (error) {
        res.json({success: false, message: error.message});
    }

}

const userOrders = async(req, res)=>{
    try {
    const userId = req.body;
    const currentOrder = await orderModel.findOne(userId).sort({date: -1});
    res.json({success: true, order: currentOrder});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const allOrders = async(req, res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true, orders});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

const updateStatus = async(req, res)=>{

}

export {placeOrder, allOrders, userOrders, updateStatus}