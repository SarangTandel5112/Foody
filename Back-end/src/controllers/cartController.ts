import express, {Request, Response} from "express";
import food from "../models/food";
import user from "../models/user";
import cartDetails from "../models/cartDetails";
import requestInterface from "../interface/requestInterface";

import cart from "../models/cart";

class cartController{
    // ------------ AddCart -----------------//
    public addCart = async(req: requestInterface, res: Response) => {    
             
            const { quantity,description } = req.body;
            const {foodid} = req.params;

            //   console.log(foodid);
            // console.log(req.user);
            const userfound=await user.findById(req.user.id);
            if(userfound){
                // console.log(userfound.cartId);
            }

            const foodfound=await food.findById(foodid);
            

            const newcartdetails=new cartDetails({
                foodId:foodid,
                quantity:quantity,
                description:description,
            })
            newcartdetails.save()

            if(userfound && foodfound){
                
                
                const cart1=await cart.findByIdAndUpdate(
                    userfound.cartId,
                    {$push:{cartDetailsId:newcartdetails._id}},{new:true})
                // console.log(cart1);
                    
            }

    //         if(foodfound){
    //             // console.log(foodfound.price);

    //             const cart2=await cart.findByIdAndUpdate(
    //                 foodfound.price,
    //                 {$push:{c:newcartdetails._id}},{new:true})
    //             console.log(cart1);
    //         }
    // }
        
};
}

export default cartController;