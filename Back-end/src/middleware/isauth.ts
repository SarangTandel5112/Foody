import { Request, Response, NextFunction } from "express"
import requestInterface from "../interface/requestInterface"
import jwt, { JwtPayload } from "jsonwebtoken"

class isauth {
    public isLoggenin = async (req: requestInterface, res: Response, next: NextFunction) => {
        if (!req.cookies.AuthToken) {
            res.status(400).json({ status: false, data: "Please Login" })
        }
        else {
            const token: JwtPayload = await (jwt.verify(req.cookies.AuthToken, process.env.SECRET_KEY as string) as JwtPayload)
            req.user = token;
            next();
        }
    }

    public isRestaurant = async (req: requestInterface, res: Response, next: NextFunction) => {
        if (req.user.user == "restaurant") {
            next();
        }
        else {
            res.status(400).json({ status: false, data: "Not Valid User" })
        }
    }

    public isUser = async (req: requestInterface, res: Response, next: NextFunction) => {
        if (req.user.user == "user") {
            next();
        }
        else {
            res.status(400).json({ status: false, data: "Not Valid User" })
        }
    }

}

export default isauth;