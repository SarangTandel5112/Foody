import express, { Request, Response } from "express";
import food from "../models/food";
import user from "../models/user";
import cartDetails from "../models/cartDetails";
import cart from "../models/cart"
import requestInterface from "../interface/requestInterface";
import User from "../models/user";

class cartController {
    // ------------ AddCart -----------------//

    public fetchcart = async (req: requestInterface, res: Response) => {

        const userId = req.user.id;
        const user = await User.findById(userId);
        if (user) {
            const userCart = await cart.findById(user.cartId).populate({ path: "cartDetailsId" });
            return res.status(200).json({ data: userCart });
        }

    }


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
        if (foodfound) {
           console.log("restaurantId",foodfound.restaurantId);
        }

        const restaurantfound = foodfound.restaurantId;
        // console.log(restaurantfound);

        if(!restaurantfound){
            return res.status(404).json({ data: "restaurant not found" });
        }

        if (userfound) {
            const newcartdetails = new cartDetails({
                foodId: foodid,
                quantity: quantity,
                description: description,
                cartId: userfound.cartId
            })
            newcartdetails.save();
            // console.log(userfound.cartId);
            
        if(restaurantfound){
            // console.log(restaurantfound); 
            // console.log(userfound.cartId,"cart");
                       
                const restaurant = await cart.findByIdAndUpdate(
                    userfound.cartId,
                    { $set: { restaurantId:restaurantfound} }, { new: true });  
                    // console.log(restaurant);                         
    
        }

            const sum=Number(newcartdetails?.quantity)*Number(foodfound?.price);

            const usercart = await cart.findById(userfound.cartId);
            if (foodfound && usercart) {
                const cart1 = await cart.findByIdAndUpdate(
                    userfound.cartId,
                    { $push: { cartDetailsId: newcartdetails._id }, $set: { totalPrice: Number(usercart.totalPrice) + Number((sum)) } }, { new: true });
                
                // console.log(cart1)
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
    public updateCart = async (req: requestInterface, res: Response) => {

        let { cartId } = req.params;
        cartId = cartId.trim()
        const userId = req.user.id;
        // console.log(cartId);
        const cartupdate = await cartDetails.findById(cartId);

        if (!cartupdate) {
            return res.status(404).json({ data: "Item not found" })
        }

        const checkcart = await cart.findById(cartupdate.cartId);

        if (checkcart) {
            if (checkcart.userId.toString() !== userId) {
                return res.status(400).json({ data: "Item does not exist to your account" })
            }
        }
        const dataupdate = req.body;
        const { quantity } = req.body;
        if (quantity) {
            const fooddata = await food.findById(cartupdate.foodId);
            // console.log(cartupdate.quantity);
            const sum = Number(quantity) - Number(cartupdate.quantity);
            if (fooddata) {
                const editprice = sum * Number(fooddata.price);
                // console.log(editprice);
                await cart.findByIdAndUpdate(cartupdate.cartId, { $set: { totalPrice: Number(checkcart?.totalPrice) + Number(editprice) } }, { new: true })
                const temp = await cartDetails.findByIdAndUpdate(cartId, { $set: { ...dataupdate } }, { new: true })
                // console.log(temp);
            }
        }
        return res.status(200).json({ data: "Cart Update Successfully" })
    }

}

export default cartController;