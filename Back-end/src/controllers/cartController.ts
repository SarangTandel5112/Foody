import express, {Request, Response} from "express";
import restaurantDoc from "../interface/cartInterface";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";
import cookieparser from "cookie-parser";
import nodemailer from 'nodemailer';
import cartModel from "../models/cart";
import food from "../models/food";
import user from "../models/user";


class cartController{
    // ------------ AddCart -----------------//
    public addCart = async(req: Request, res: Response) => {    
             
           const { userId,totalPrice } = req.body;
           const food = req.params.id;
            const {uid}=req.params;
            const cart = new cartModel({
                foodId:food,
                userId:userId,
                totalPrice:totalPrice
            });
            cart.foodId.push(uid)
    
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


