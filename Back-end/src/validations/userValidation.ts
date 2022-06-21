import { Request, Response, Express, NextFunction } from "express";
import {check, validationResult} from "express-validator";
import requestInterface from "../interface/requestInterface";

class userValidation {

    public validateUser = [
        check('name', 'Name should atleast have 3 letters').isLength({min:3}),
        check('email', 'E-mail ID is in-valid').isEmail(),
        check('password', 'Password must contain atleast 8 characters').isLength({min:8}),
        check('address', 'address must contain atleast 8 characters').isLength({min:8,max:100}),
        check('phone', 'phone number must contain atleast 10 digits').isLength({min:10,max:10}),

        (req: requestInterface, res: Response, next: NextFunction) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                return res.status(422).json(
                    {errors: errors.array().map((error) => {
                    return {
                        value: error.value,
                        msg: error.msg
                    }
                })
            });
        }
        else {
           next();
        }
    }
]

}

export default userValidation;