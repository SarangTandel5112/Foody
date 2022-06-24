import express, { Request, Response } from "express";
import food from "../models/food";
import user from "../models/user";
import cartDetails from "../models/cartDetails";
import cart from "../models/cart"
import requestInterface from "../interface/requestInterface";
import order from "../models/order";


class orderController{

    public addOrder = async (req: requestInterface, res: Response) => {

        const { cartId } = req.params;
        const cartid = cartId.trim()
        
        const userfound = await user.findById(req.user.id);
        // console.log("userfound",userfound);
        
        const CartData = await cart.findById(cartid).select(["cartDetailsId","userId","restaurantId","totalPrice"]);
        // console.log("cartfound",CartData);

        if (!CartData) {
            return res.status(404).json({ data: "cart not found" });
        }

        if(CartData ){                     
                const Order = await order.findByIdAndUpdate(
                    userfound?.cartId,
                    { $set: { cartDetails:CartData } }, { new: true });  
                // console.log(userfound?.cartId);   
                console.log(CartData);
                // const cart1=     {...CartData}            
                const orderdata=new order({
                    cartDetailsId:CartData.cartDetailsId,
                    userId:CartData.userId,
                    restaurantId:CartData.restaurantId,
                    totalPrice:CartData.totalPrice,
                }) 
                orderdata.save(); 

                const cartDelete = await cart. findByIdAndDelete(cartid);
                // console.log(cartDelete)                  
        }
        return res.status(200).json({ data: "Order successfully created" });
        }
      
    }

export default orderController;