import express, { Request, Response } from "express";
import restaurantDoc from "../interface/restaurantInterface";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import cookieparser from "cookie-parser";
import nodemailer from 'nodemailer';
// import Restaurant from "../models/restaurant";
import requestInterface from "../interface/requestInterface";

import db from "../db/sequelizeConnect";
import { resolveScopes } from "sequelize-typescript";
import { where } from "sequelize/types";
// import restaurant from "../models/restaurant";

const User = db.users
const Restaurant = db.restaurant
const food = db.food
const Cart = db.cart
const CartDetails = db.cartdetails

class RestaurantRegistration {

    public restaurantRegistration = async (req: Request, res: Response) => {

        const hashPassword = await bcrypt.hash(req.body.password, 10)
            const { RestaurantName, OwnerName, email, password } = req.body;

            const addRestorent = await Restaurant.create({ RestaurantName,
                OwnerName,
                email,
                password: hashPassword })
            console.log(addRestorent);

            res.status(200).json({data:addRestorent})
            // const doc = await Restaurant.create({
            //     RestaurantName,
            //     OwnerName,
            //     email,
            //     password: hashPassword
            // });

            // doc.save()

            // try {
            //     const a = await jwt.sign({ ...doc }, process.env.SECRET_KEY as string)
            //     try {
            //         let mailTransporter = nodemailer.createTransport({
            //             service: 'gmail',
            //             auth: {
            //                 user: process.env.EMAIL,
            //                 pass: process.env.EMAIL_PASSWORD
            //             }
            //         });
            //         let mailDetails = {
            //             from: process.env.EMAIL,
            //             to: email,
            //             subject: 'Verification of your account',
            //             html: `<h1 style="text-align: center;">Verify Your Account</h1> http://localhost:3000/verifyRestaurantEMail/${a}           
            //         <h3 style="text-align: center;">Thank You</h3>`
            //         };
            //         mailTransporter.sendMail(mailDetails, function (err, data) {
            //             if (err) {
            //                 console.log(err)
            //             } else {
            //                 console.log('Email sent successfully');
            //             }
            //         });
            //     } catch (error) {
            //         console.log("error while sending mail", error);
            //     }
            // }

            // catch (error) {
            //     console.log("error in token");
            // }
    }

    public verifyRestaurantRegistration = async (req: Request, res: Response) => {

        try {

            const uid: string = req.params.id;
            const token: any = (await jwt.verify(uid, process.env.SECRET_KEY as string)) as restaurantDoc;

            const checkEmail = await Restaurant.findOne({ email: token._doc.email });

            if (checkEmail !== null) {
                res.send("Your account is already verified!!!");
            }

            else {

                const data = new Restaurant(token._doc);
                data.save();
                res.send(`<h1> ${data.RestaurantName}, You have successfully completed your Registration!!!`)

            }

        } catch (error) {
            console.log(error, "error in verification");

        }
    }

    public restaurantLogin = async (req: Request, res: Response) => {

        try {
            const { email, password } = req.body;

            const result: any = await Restaurant.findOne({ email: email })


            if (result != null) {

                const isMatch = await bcrypt.compare(password, result.password)
                if (result.email === email && isMatch) {

                    const a = {
                        RestaurantName: result.RestaurantName,
                        OwnerName: result.OwnerName,
                        email: result.email,
                        id: result._id,
                        user: "restaurant"
                    }

                    const token = jwt.sign(a, process.env.SECRET_KEY as string);
                    res.status(200).cookie("AuthToken", token).set("AuthToken", token).json({ status: "Success" });

                }

                else if (isMatch === false) {
                    res.send("Invalid Password!!!")
                }
            }

            else {
                res.send(`<h1>You are not a registered Restaurant...</h1>`);
            }
        }

        catch (error) {
            console.log(error);
        }

    }

}

export default RestaurantRegistration;