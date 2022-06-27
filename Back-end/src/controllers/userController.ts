import express, { Request, Response } from "express";
import { QueryTypes } from "sequelize";
// import User from "../models/user";
import cart from "../models/cart";
import userDoc from "../interface/userInterface";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import requestInterface from "../interface/requestInterface";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import passport from "passport";
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "902945112024-3mv4mc5dafkt56jtag0mpesedpe4mpsd.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
// import clientid from "../db/googlekey"
// const clientID = clientid.clientId
// import clientkey from "../db/googlekey"
// const clientserceT = clientid.clientSercet


import db from "../db/sequelizeConnect";
import cartDetails from "../models/cartDetails";

import { resolveScopes } from "sequelize-typescript";
import { where } from "sequelize/types";

const User = db.users
const Restaurant = db.restaurant
const Cart = db.cart
const CartDetails = db.cartdetails

class Registration {

    public registration = async (req: requestInterface, res: Response) => {

        const hashPassword = await bcrypt.hash(req.body.password, 10)

        const { email, name, password, address, phone } = req.body;
        // const data = req.body;            

        // const doc: userDoc = new User({ 
        //     name: name,
        //     email: email,
        //     password: hashPassword,
        //     address : address,
        //     phone : phone
        // });

        const adduser = await User.create({ name, email, password: hashPassword, address, phone })
        console.log(adduser);
        // const addcart = await Cart.create()
        // await adduser.setCart(addcart)
        // adduser.cartId = addcart.id;
        // adduser.save();
        res.status(200).json({ data: adduser })

        // const usercart=new cart({
        //     userId:doc._id,
        // })

        // usercart.save();
        // doc.cartId=usercart._id;

        // // console.log(doc)

        // doc.save();
        // res.send(doc)

    }

    public viewuser = async (req: Request, res: Response) => {
        // const { userId } = req.params;
        // console.log(userId);
        const user = await User.findAll(
            // {
            // include: [{
            //     model: Cart
            // }]
        // }
        )
        console.log(user);
        res.json({ data: user })
        // const user = await User.destroy({ where: { id: userId } })
        // res.send("Deleted Successfully")
    }

    public addcartdetails = async (req: Request, res: Response) => {
        // console.log("cartadd");
        // console.log(req.body);
        const { quantity, description } = req.body;
        // console.log(quantity, description);
        const cartDetailsData = await CartDetails.create({ quantity, description })
        console.log(cartDetailsData);
        const user = await User.findAll({
            include: [{
                model: Cart,
                attributes: ["userId"]
            }]
        })

        const fId = await db.sequelize.query("select id from carts where userId=1", {
            type: QueryTypes.SELECT
        })
        const cartDetails = await CartDetails.create({ quantity,description })
        res.status(200).json({data:cartDetails})

        // console.log(fId[0].id);

        const cart = await Cart.findOne({ where: { id: fId[0].id } })
        // console.log(cart);
        await cart.addCartdetails(cartDetailsData)

        // console.log(user);

        // const user = await User.findOne({ where: { id: 1} })
        res.send(cart)
        // console.log(user.cart);

    }

    public userDelete = async (req: Request, res: Response) => {
        const { id } = req.params;
        await User.destroy({where :{id:id}})
        res.status(200).json("your data is delete")
        console.log("your data is delete", id)
    }

    public userUpdate = async (req: Request, res: Response) => {

        const { id } = req.params;
        console.log(id)
        // const data = req.body
        // console.log(resId);
        // console.log(data);        

        // const userdata = await User.findOne(id)
        // console.log(userdata);

        const hashPassword = await bcrypt.hash(req.body.password, 10)

        // const id = req.params;
        const { name,email,password,address,phone } = req.body;
        // const { data} = req.body;
        const updata = await User.update({ name,email,password:hashPassword,address,phone },{where:{id}})
        console.log({...req.body})
        // console.log(updata);


        res.status(200).json({ data: "Item updated sucessfully" })
    }

    public verifyRegistration = async (req: Request, res: Response) => {

        try {

            const uid: string = req.params.id;
            const token: any = (await jwt.verify(uid, process.env.SECRET_KEY as string)) as userDoc;

            const checkEmail = await User.findOne({ email: token._doc.email });

            if (checkEmail !== null) {
                res.send("Your account is already verified!!!");
            }

            else {

                const data = new User(token._doc);
                data.save();
                res.send(`<h1> ${data.name}, You have successfully completed your Registration!!!`)

            }

        } catch (error) {
            console.log(error, "error in verification");

        }
    }

    public login = async (req: Request, res: Response) => {

        try {
            const { email, password } = req.body;

            const result: any = await User.findOne({ email: email })


            if (result != null) {
                const isMatch = await bcrypt.compare(password, result.password)


                if (result.email === email && isMatch) {

                    const a = {
                        email: result.email,
                        name: result.name,
                        password: result.password,
                        address: result.address,
                        phone: result.phone,
                        id: result._id,
                        user: "user"
                    }
                    console.log(a)
                    const token = jwt.sign(a, process.env.SECRET_KEY as string);
                    res.status(200).cookie("AuthToken", token).set("AuthToken", token).json({ status: `<h1> You have Successfully Logged in!!!!!</h1>` });

                }

                else if (isMatch === false) {
                    res.send("Invalid Password!!!")
                }
            }

            else {
                res.send(`<h1>You are not a registered User...</h1>`)
            }
        }

        catch (error) {
            console.log(error);
        }

    }

    public googleAuth = async (req: Request, res: Response) => {

        let token = req.body.token;
        console.log(token);
        async function verify() {
          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
          });
          const payload = ticket.getPayload();
          
          const doc = new User({
            name:payload.name,
            email:payload.email,
            address:payload.picture,
            phone:payload.exp
          })
          doc.save()
          console.log(doc);


        }
        verify()
          .then(() => {
            res.cookie("session-token", token);
            res.send("success");
          })
          .catch(console.error);
    }
    



}

export default Registration;