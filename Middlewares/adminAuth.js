import jwt from 'jsonwebtoken';

const adminAuth = async(req, res, next)=>{
    try {
        const {atoken}= req.headers;
        if(!atoken){
            res.json({success: false, message: 'Not authorized login again'});
        }
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        if(decoded.email !== process.env.ADMIN_EMAIL || decoded.password !== process.env.ADMIN_PASSWORD){
            res.json({success: false, message: 'Not authorized login again'});
        }
        next();
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export default adminAuth;