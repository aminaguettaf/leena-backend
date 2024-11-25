import mongoose from 'mongoose';

const prodSchema = new mongoose.Schema({
    name:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type: String, required:true},
    sizes:{type: Array, required:true},
    colors:{type: Array, required:true},
    image:{type: Array, required:true},
    description:{type: String},
    date:{type:Number, required:true}
})

const productModel = mongoose.models.product || mongoose.model('product', prodSchema);

export default productModel;