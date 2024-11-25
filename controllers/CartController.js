import userModel from '../models/UserModel.js';

const addToCart = async (req, res) => {
    try {
        const { userId, productId, size, color } = req.body;
        const user = await userModel.findById(userId);
        let cart = user.cart;
        if (!cart[productId]) {
            cart[productId] = {};
        }
        if (!cart[productId][size]) {
            cart[productId][size] = {};
        }
        if (!cart[productId][size][color]) {
            cart[productId][size][color] = 0;
        }
        cart[productId][size][color] += 1;

        await userModel.findByIdAndUpdate(userId, {cart});
        res.json({ success: true, message: "Added to cart"});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



const removeFromCart = async(req, res)=>{
    try {
        const {userId, productId, size, color} = req.body;
        const user = await userModel.findById(userId);
        const cart = user.cart;
        if(cart[productId] && cart[productId][size] && cart[productId][size][color]){
            if(cart[productId][size][color] > 1){
                cart[productId][size][color] -=1;
            }
            else{
                delete cart[productId][size][color];
                if (Object.keys(cart[productId][size]).length === 0) {
                    delete cart[productId][size];
                }
                if (Object.keys(cart[productId]).length === 0) {
                    delete cart[productId];
                }
            }
        }
        await userModel.findByIdAndUpdate(userId, { cart });
        res.json({success:true, message:'Product deleted'});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

const getCart = async(req, res)=>{
    try {
        const{userId} = req.body;
        const user = await userModel.findById(userId);
        const cart = user.cart;
        res.json({success: true, cart});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}

export {addToCart, removeFromCart, getCart}