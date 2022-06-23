import express, {Request, Response} from "express";
import cartModel from "../models/cart";
import food from "../models/food";
import user from "../models/user";
import cartDetails from "../models/cartDetails";
import cart from "../models/cart"
import requestInterface from "../interface/requestInterface";
import foodinterface from "../interface/foodInterface";
import cartDetailsInterface from "../interface/cartDetailsInterface";

class cartController{
    // ------------ AddCart -----------------//
    public addCart = async (req: requestInterface, res: Response) => {

        const { quantity, description } = req.body;
        const { foodid } = req.params;

        if (!quantity) {
            return res.status(404).json({ data: "Please select quantity" })
        }

        const userfound = await user.findById(req.user.id);

        const foodfound = await food.findById(foodid);

        if (!foodfound) {
            return res.status(404).json({ data: "food not found" })
        }

        if (userfound) {
            const newcartdetails = new cartDetails({
                foodId: foodid,
                quantity: quantity,
                description: description,
                cartId: userfound.cartId
            })
            newcartdetails.save();

            const usercart = await cart.findById(userfound.cartId);
            if (foodfound && usercart) {
                const cart1 = await cart.findByIdAndUpdate(
                    userfound.cartId,
                    { $push: { cartDetailsId: newcartdetails._id }, $set: { totalPrice: Number(usercart.totalPrice) + Number(foodfound.price) } }, { new: true });
                
                console.log(cart1)
            }

            return res.status(200).json({ data: "Item Added to cart successfully" })
        }
    }
        
};

export default cartController;