"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class userValidation {
    constructor() {
        this.validateUser = [
            (0, express_validator_1.check)('name', 'Name should atleast have 3 letters').isLength({ min: 3 }),
            (0, express_validator_1.check)('email', 'E-mail ID is in-valid').isEmail(),
            (0, express_validator_1.check)('password', 'Password must contain atleast 8 characters').isLength({ min: 8 }),
            (req, res, next) => {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array().map((error) => {
                            return {
                                value: error.value,
                                msg: error.msg
                            };
                        })
                    });
                }
                else {
                    next();
                }
            }
        ];
    }
}
exports.default = userValidation;
