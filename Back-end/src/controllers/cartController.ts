import express, {Request, Response} from "express";
import cartModel from "../models/cart";
import food from "../models/food";
import user from "../models/user";
import cartDetails from "../models/cartDetails";
import requestInterface from "../interface/requestInterface";
import foodinterface from "../interface/foodInterface";
import cartDetailsInterface from "../interface/cartDetailsInterface";

class cartController{
    // ------------ AddCart -----------------//
    public addCart = async(req: requestInterface, res: Response) => {    
             
            const { totalPrice,quantity,description } = req.body;
            const {foodid} = req.params;

              console.log(foodid);
            // console.log(req.user);
            const userfound=await user.findById(req.user.id);
            // console.log(userfound);

            const foodfound=await food.findById(foodid);
           // console.log(foodfound);

            const foodPrice = await food.findById(foodid).select("price");
            if(foodPrice){
                console.log(foodPrice.price);
            }

            const CartDetails = new cartDetails({
                foodId:foodid,
                quantity:quantity,
                description:description,
            })


            const cart = new cartModel({
                cartDetails: CartDetails,
                userId:userfound,                
                totalPrice:foodPrice,
            });

           await CartDetails.save()  
           await cart.save()  
           .then((data:any)=> {
            // console.log(data);
                
               res.status(200).send(data);
           })
           .catch((err:any)=> {
           res.status(500).send({
               message:
               err.message || "Some error occurred while creating the Cart."
           });

       });
    }

};

export default cartController;


