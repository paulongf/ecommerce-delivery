

// Update User CartData : /api/cart/update

import User from "../models/User.js";

export const updateCart = async(req, res)=> {
    try {

        const {userId, cartItems} = req.body;
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({success: true, message: "Car Updated"})
        console.log("user:", userId)
        console.log("cartItems:", JSON.stringify(cartItems, null, 2))

    } catch (error) {
        
        console.log(error.message)
        res.json({success: false, message: error.message})
        
    }
}