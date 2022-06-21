import express, { Request, Response, Router } from 'express';
import userValidation from '../validations/userValidation';
import Registration from '../controllers/userController';
import restaurantValidation from '../validations/restaurantValidation';
import RestaurantRegistration from '../controllers/restaurantController';
import cartController from '../controllers/cartController';



const registerUser = new Registration();
const UserValidation = new userValidation();

const registerRestaurant = new RestaurantRegistration();
const RestaurantValidation = new restaurantValidation();

const cart = new  cartController();


class Routes {
    
public router: express.Router;

constructor() {
    this.router = express.Router();
    this.root();
    this.registration();
    this.login();
    this.restaurantRegistration();
    this.restaurantLogin();
    this.userVerification();
    this.restaurantVerification();
    this.cart();
}

private root() {
    this.router.get('/', (req: Request, res: Response) => {
            res.send(`<h1> Hello Foodies, Welcome to FOODY!!!!! </h1>`);
})
}

private registration() {
    this.router.route('/registration').post(UserValidation.validateUser, registerUser.registration)
}

private login() {
    this.router.route('/login').post(registerUser.login);
}

private restaurantRegistration() {
    this.router.route('/restaurantRegistration').post(RestaurantValidation.validateRestaurant, registerRestaurant.restaurantRegistration)
}

private restaurantLogin() {
    this.router.route('/hotelLogin').post(registerRestaurant.restaurantLogin);
}

private userVerification() {
    this.router.route('/verifyEMail/:id').get(registerUser.verifyRegistration);
}

private restaurantVerification() {
    this.router.route('/verifyRestaurantEMail/:id').get(registerRestaurant.verifyRestaurantRegistration);
}

//------------------  Cart Routes -------------//


private cart() {
    this.router.route('/addCart/:id/:uid').post(cart.addCart);
}

}

export default Routes;



















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