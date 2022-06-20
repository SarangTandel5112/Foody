"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class Registration {
    constructor() {
        this.registration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield bcrypt_1.default.hash(req.body.password, 10);
            try {
                const { email, name, password } = req.body;
                const doc = new user_1.default({
                    name: name,
                    email: email,
                    password: hashPassword
                });
                try {
                    const a = yield jsonwebtoken_1.default.sign(Object.assign({}, doc), process.env.SECRET_KEY);
                    try {
                        let mailTransporter = nodemailer_1.default.createTransport({
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
                                console.log(err);
                            }
                            else {
                                console.log('Email sent successfully');
                            }
                        });
                    }
                    catch (error) {
                        console.log("error while sending mail", error);
                    }
                }
                catch (error) {
                    console.log("error in token");
                }
                res.send("Please Verify Your E-Mail ID!!!");
            }
            catch (error) {
                console.log(error);
            }
        });
        this.verifyRegistration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const uid = req.params.id;
                const token = (yield jsonwebtoken_1.default.verify(uid, process.env.SECRET_KEY));
                const checkEmail = yield user_1.default.findOne({ email: token._doc.email });
                if (checkEmail !== null) {
                    res.send("Your account is already verified!!!");
                }
                else {
                    const data = new user_1.default(token._doc);
                    data.save();
                    res.send(`<h1> ${data.name}, You have successfully completed your Registration!!!`);
                }
            }
            catch (error) {
                console.log(error, "error in verification");
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield user_1.default.findOne({ email: email });
                if (result != null) {
                    const isMatch = yield bcrypt_1.default.compare(password, result.password);
                    if (result.email === email && isMatch) {
                        const a = {
                            name: result.name,
                            email: result.email,
                            id: result._id
                        };
                        const token = jsonwebtoken_1.default.sign(a, process.env.SECRET_KEY);
                        res.status(200).cookie("Auth-Token", token).set("Auth-Token", token).json({ status: `<h1> You have Successfully Logged in!!!!!</h1>` });
                    }
                    else if (isMatch === false) {
                        res.send("Invalid Password!!!");
                    }
                }
                else {
                    res.send(`<h1>You are not a registered User...</h1>`);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Registration;
