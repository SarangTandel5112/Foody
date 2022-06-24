import express, { Request, Response } from "express";
// import User from "../models/user";
import cart from "../models/cart";
import userDoc from "../interface/userInterface";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import requestInterface from "../interface/requestInterface";
import db from "../db/sequelizeConnect";

const User = db.users
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
        const addcart = await Cart.create()
        await adduser.setCart(addcart)
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
        const { userId } = req.params;
        console.log(userId);
        const user = await User.findAll({
            include: [{
                model: Cart
            }]
        })
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
        // const cartDetailsData = CartDetails.create({ quantity, description })
        // console.log(CartDetails);
        // const user = await User.findAll({
        //     include: [{
        //         model: Cart
        //     }]
        // })

        const user = await User.findOne({ where: { } })

        // res.send(user.cart)
        // console.log(user.cart);


    }

    public userDelete = async (req: Request, res: Response) => {
        const { id } = req.params;
        await User.findByIdAndDelete(id)
        res.status(200).json("your data is delete")
        console.log("your data is delete", id)
    }

    public userUpdate = async (req: Request, res: Response) => {

        const { id } = req.params;
        const data = req.body
        // console.log(resId);
        // console.log(data);        

        const userdata = await User.findById(id)
        // console.log(userdata);

        const bodydata = req.body;
        const updata = await User.findByIdAndUpdate(id, { ...bodydata })
        console.log(updata);


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




}

export default Registration;