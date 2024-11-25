import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    items: { type: Object, default: {} }
})

const cartModel = mongoose.models.cart || mongoose.model('cart', cartSchema);

export default cartModel;