"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userValidation_1 = __importDefault(require("../validations/userValidation"));
const userController_1 = __importDefault(require("../controllers/userController"));
const restaurantValidation_1 = __importDefault(require("../validations/restaurantValidation"));
const restaurantController_1 = __importDefault(require("../controllers/restaurantController"));
const registerUser = new userController_1.default();
const UserValidation = new userValidation_1.default();
const registerRestaurant = new restaurantController_1.default();
const RestaurantValidation = new restaurantValidation_1.default();
class Routes {
    constructor() {
        this.router = express_1.default.Router();
        this.root();
        this.registration();
        this.login();
        this.restaurantRegistration();
        this.restaurantLogin();
        this.userVerification();
        this.restaurantVerification();
    }
    root() {
        this.router.get('/', (req, res) => {
            res.send(`<h1> Hello Foodies, Welcome to FOODY!!!!! </h1>`);
        });
    }
    registration() {
        this.router.route('/registration').post(UserValidation.validateUser, registerUser.registration);
    }
    login() {
        this.router.route('/login').post(registerUser.login);
    }
    restaurantRegistration() {
        this.router.route('/restaurantRegistration').post(RestaurantValidation.validateRestaurant, registerRestaurant.restaurantRegistration);
    }
    restaurantLogin() {
        this.router.route('/hotelLogin').post(registerRestaurant.restaurantLogin);
    }
    userVerification() {
        this.router.route('/verifyEMail/:id').get(registerUser.verifyRegistration);
    }
    restaurantVerification() {
        this.router.route('/verifyRestaurantEMail/:id').get(registerRestaurant.verifyRestaurantRegistration);
    }
}
exports.default = Routes;
// export const router = express.Router({
//     strict: true
// });
// router.get('/', (req: Request, res: Response) => {
//     return res.status(200).json({
//         message: "Hello World!....."
//     });
// })
// router.get('/', (req: Request, res: Response) => {
//     return res.status(200).json({
//         message: "Hello World!....."
//     });
// })
// export default router;
