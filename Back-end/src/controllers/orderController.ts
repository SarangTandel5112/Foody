import express, { Request, Response } from "express";
import food from "../models/food";
import user from "../models/user";
import cartDetails from "../models/cartDetails";
import cart from "../models/cart"
import requestInterface from "../interface/requestInterface";
import User from "../models/user";

class orderController{

    public addOrder = async (req: requestInterface, res: Response) => {

        const { cartId } = req.params;
        const cartid = cartId.trim()
        
        const userfound = await user.findById(req.user.id);
        console.log("userfound",userfound);
        
        const CartData = await cart.findById(cartid);
        console.log("cartfound",CartData);

        if (!CartData) {
            return res.status(404).json({ data: "cart not found" });
        }
        if (CartData) {
           console.log("totalPrice",CartData.totalPrice);
           console.log("restaurantId",CartData.restaurantId);
        }

        //const restaurantfound = foodfound.restaurantId;
        // console.log(restaurantfound);

        // if (userfound) {
        //     const newcartdetails = new cartDetails({
        //         foodId: foodid,
        //         quantity: quantity,
        //         description: description,
        //         cartId: userfound.cartId
        //     })
        //     newcartdetails.save();
        //     // console.log(userfound.cartId);
            
        // if(restaurantfound){
        //     // console.log(restaurantfound); 
        //     // console.log(userfound.cartId,"cart");
                       
        //         const restaurant = await cart.findByIdAndUpdate(
        //             userfound.cartId,
        //             { $set: { restaurantId:restaurantfound} }, { new: true });  
        //             // console.log(restaurant);                         
    
        // }

        //     const sum=Number(newcartdetails?.quantity)*Number(foodfound?.price);

        //     const usercart = await cart.findById(userfound.cartId);
        //     if (foodfound && usercart) {
        //         const cart1 = await cart.findByIdAndUpdate(
        //             userfound.cartId,
        //             { $push: { cartDetailsId: newcartdetails._id }, $set: { totalPrice: Number(usercart.totalPrice) + Number((sum)) } }, { new: true });
                
        //         // console.log(cart1)
        //     }

            return res.status(200).json({ data: "Order successfully created" })
        }
      
    }



export default orderController;