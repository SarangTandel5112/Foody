import { Request, Response, Express, NextFunction } from "express";
import {check, validationResult} from "express-validator";
import requestInterface from "../interface/requestInterface";

class restaurantValidation {

    public validateRestaurant = [
        check('RestaurantName', 'Restaurant-Name should atleast have 3 letters').isLength({min:2}),
        check('OwnerName', 'Name should atleast have 3 letters').isLength({min:2}),
        check('email', 'E-mail ID is in-valid').isEmail(),
        check('password', 'Password must contain atleast 8 characters').isLength({min:8}),

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

export default restaurantValidation;