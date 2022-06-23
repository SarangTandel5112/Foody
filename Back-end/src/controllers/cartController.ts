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

            const sum=Number(newcartdetails?.quantity)*Number(foodfound?.price)

            const usercart = await cart.findById(userfound.cartId);
            if (foodfound && usercart) {
                const cart1 = await cart.findByIdAndUpdate(
                    userfound.cartId,
                    { $push: { cartDetailsId: newcartdetails._id }, $set: { totalPrice: Number(usercart.totalPrice) + Number((sum)) } }, { new: true });
                
                console.log(cart1)
            }

            return res.status(200).json({ data: "Item Added to cart successfully" })
        }
    }

    public deleteCart = async (req: requestInterface, res: Response) => {
        const { cartDetailsId } = req.params;
        const cartdetailsdata=await cartDetails.findById(cartDetailsId)
        // console.log(cartDetailsId)
        // const { foodid } = req.params;
        
        const cartdata=await cart.findById(cartdetailsdata?.cartId)
        // console.log(cartdata);
        const fooddata=await food.findById(cartdetailsdata?.foodId)
        // console.log(fooddata); 
        // console.log(Number(cartdetailsdata?.quantity)*Number(fooddata?.price))
        const sum=Number(cartdetailsdata?.quantity)*Number(fooddata?.price)
        // console.log(sum,cartdetailsdata?.quantity,fooddata?.price);
        // console.log(cartdetailsdata?.cartId)
        await cart.findByIdAndUpdate(cartdetailsdata?.cartId,{$set:{totalPrice:Number(cartdata?.totalPrice)-Number(sum)}},{new:true})
        await cartDetails.findByIdAndDelete(cartDetailsId)
        
        return res.status(200).json({ data: "Food Deleted Successfully" });

    } 
}

export default cartController;