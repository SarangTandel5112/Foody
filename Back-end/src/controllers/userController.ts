import express, {Request, Response} from "express";
import User from "../models/user";
import userDoc from "../interface/userInterface";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';

class Registration {

    public registration = async(req: Request, res: Response) => {

        const hashPassword = await bcrypt.hash(req.body.password, 10)
        try {
            const {email, name, password} = req.body;

            const doc: userDoc  = new User({
                name: name,
                email: email,
                password: hashPassword
            });

            try {
                const a = await jwt.sign({ ...doc }, process.env.SECRET_KEY as string)
                try {
                  let mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: process.env.EMAIL,
                      pass: process.env.EMAIL_PASSWORD
                    }
                  });
                  let mailDetails = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Verification of your account',
                    html: `<h1 style="text-align: center;">Verify Your Account</h1> http://localhost:3000/verifyEMail/${a}           
                    <h3 style="text-align: center;">Thank You</h3>`
                  };
                  mailTransporter.sendMail(mailDetails, function (err, data) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log('Email sent successfully');
                         }
                  });
                } catch (error) {
                  console.log("error while sending mail", error);
                }
              }
              catch (error) {
                console.log("error in token");
              }

        res.send("Please Verify Your E-Mail ID!!!")
        } catch (error) {
            console.log(error);
            
        }

    }

    public verifyRegistration = async (req: Request, res: Response) => {

        try {
            
            const uid: string = req.params.id;
            const token: any = (await jwt.verify(uid, process.env.SECRET_KEY as string)) as userDoc;

            const checkEmail = await User.findOne({email: token._doc.email});

            if (checkEmail !== null) {
                res.send("Your account is already verified!!!");
            }

            else{

                const data = new User( token._doc );
                data.save();
                res.send(`<h1> ${data.name}, You have successfully completed your Registration!!!`)
            
            }

        } catch (error) {
            console.log(error, "error in verification");
            
        }
    }

    public login = async(req: Request, res: Response) => {

        try {
            const { email, password } = req.body;

            const result: any  = await User.findOne({email: email})
            
            
            if (result != null) {
                const isMatch = await bcrypt.compare(password, result.password)
                if (result.email === email && isMatch) {

                    const a = {
                        name: result.name,
                        email: result.email,
                        id: result._id
                    }

                    const token = jwt.sign(a, process.env.SECRET_KEY as string);
                    res.status(200).cookie("Auth-Token", token).set("Auth-Token", token).json({status: `<h1> You have Successfully Logged in!!!!!</h1>`});

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