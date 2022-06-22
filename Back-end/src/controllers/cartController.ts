import express, { Request, Response } from "express";
import food from "../models/food";
import user from "../models/user";
import cartDetails from "../models/cartDetails";
import requestInterface from "../interface/requestInterface";

import cart from "../models/cart";

class cartController {
    // ------------ AddCart -----------------//
    public addCart = async (req: requestInterface, res: Response) => {

        const { quantity, description } = req.body;
        const { foodid } = req.params;

        const userfound = await user.findById(req.user.id);
        const foodfound = await food.findById(foodid);

        if (userfound) {

            const newcartdetails = new cartDetails({
                foodId: foodid,
                quantity: quantity,
                description: description,
                cartId: userfound.cartId
            })
            newcartdetails.save()
            if (foodfound) {
                const cart1 = await cart.findByIdAndUpdate(
                    userfound.cartId,
                    { $push: { cartDetailsId: newcartdetails._id }, $set: { totalPrice: +foodfound.price } }, { new: true })
            }
        }
    }
}

export default cartController;