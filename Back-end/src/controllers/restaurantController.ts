import express, { Request, Response } from "express";
import restaurantDoc from "../interface/restaurantInterface";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import cookieparser from "cookie-parser";
import nodemailer from 'nodemailer';
// import Restaurant from "../seq_models/restaurant";
import requestInterface from "../interface/requestInterface";
import db from "../db/sequelizeConn";
const Restaurant = db.restaurant

class RestaurantRegistration {

    public restaurantRegistration = async (req: Request, res: Response) => {

        const hashPassword = await bcrypt.hash(req.body.password, 10)
        try {
            const { RestaurantName, OwnerName, email, password } = req.body;

            const addRestaurant  = await Restaurant.create({  RestaurantName, OwnerName, email, password: hashPassword  });
            console.log(addRestaurant)

            res.status(200).json({ data: addRestaurant })

        } catch (error) {
            console.log(error);

        }

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

    public additem = async (req: requestInterface, res: Response) => {

        
    }

}

export default RestaurantRegistration;