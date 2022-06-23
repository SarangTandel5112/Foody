import express, { Request, Response } from "express";
import User from "../models/user";
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
  "276865150644-oa112rart3bq0qh5khrs8bjecusbfb78.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
// import clientid from "../db/googlekey"
// const clientID = clientid.clientId
// import clientkey from "../db/googlekey"
// const clientserceT = clientid.clientSercet



class Registration {

    public registration = async (req:requestInterface ,res: Response) => {

        const hashPassword = await bcrypt.hash(req.body.password, 10)
        try {
            const { email, name, password ,address , phone} = req.body;
            const data = req.body;

            const doc: userDoc = new User({ 
                // ...data
                name: name,
                email: email,
                password: hashPassword,
                address : address,
                phone : phone
            });
            // console.log(doc)
            doc.save();
            res.send(doc)
        } catch (error) {
            console.log(error,"error out");

        }

    }

    public userDelete = async(req:Request,res:Response)=>{
        const {id} = req.params;
        await User.findByIdAndDelete(id)
        res.status(200).json("your data is delete")
        console.log("your data is delete",id)
    }

    public userUpdate = async (req: Request, res: Response) => {

        const {id} = req.params;
        const data = req.body
        // console.log(resId);
        // console.log(data);        
        
        const userdata=await User.findById(id)
        // console.log(userdata);
        
        const bodydata=req.body;
        const updata=await User.findByIdAndUpdate(id,{...bodydata})
        console.log(updata);
        

        res.status(200).json({data:"Item updated sucessfully"})
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
                        password:result.password,
                        address:result.address,
                        phone:result.phone,
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