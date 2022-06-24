import express, { Request, Response, Router } from 'express';
import userValidation from '../validations/userValidation';
import Registration from '../controllers/userController';
import restaurantValidation from '../validations/restaurantValidation';
import RestaurantRegistration from '../controllers/restaurantController';
import cartController from '../controllers/cartController';

import isauth from '../middleware/isauth'
import itemcontroller from '../controllers/itemcontroller';


const registerUser = new Registration();
const UserValidation = new userValidation();
const auth=new isauth();
const registerRestaurant = new RestaurantRegistration();
const RestaurantValidation = new restaurantValidation();
const Itemcontroller=new itemcontroller();

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
    this.restaurant();
    // this.delete()
}

private root() {
    this.router.get('/', (req: Request, res: Response) => {
            res.send(`<h1> Hello Foodies, Welcome to FOODY!!!!! </h1>`);
})
}

private registration() {
    this.router.route('/registration').post(UserValidation.validateUser, registerUser.registration)
    this.router.route('/viewuser/:userId').post(registerUser.viewuser)
    this.router.route('/addcartdetails').post(registerUser.addcartdetails)
    this.router.route('/userDelete/:id').delete(auth.isLoggenin,auth.isUser,registerUser.userDelete)
    this.router.route('/userUpdate/:id').post(auth.isLoggenin,auth.isUser,registerUser.userUpdate)
}

private login() {
    this.router.route('/login').post(registerUser.login);
    this.router.route('/googeAuth').post(registerUser.googleAuth);
}


private restaurantRegistration() {
    this.router.route('/restaurantRegistration').post(RestaurantValidation.validateRestaurant, registerRestaurant.restaurantRegistration)
}

private restaurantLogin() {
    this.router.route('/hotellogin').post(registerRestaurant.restaurantLogin);
}

private userVerification() {
    this.router.route('/verifyEMail/:id').get(registerUser.verifyRegistration);
}

private restaurantVerification() {
    this.router.route('/verifyRestaurantEMail/:id').get(registerRestaurant.verifyRestaurantRegistration);
}



private cart() {
    this.router.route('/addCart/:foodid').post(auth.isLoggenin,auth.isUser,cart.addCart);
    this.router.route('/deleteCart/:cartDetailsId').delete(auth.isLoggenin,auth.isUser,cart.deleteCart);

    this.router.route('/viewCart').post(auth.isLoggenin,auth.isUser,cart.fetchcart);
    this.router.route('/updateCart/:cartId').post(auth.isLoggenin,auth.isUser,cart.updateCart);
}

private restaurant(){
    this.router.route('/additem').post(auth.isLoggenin,auth.isRestaurant,Itemcontroller.additem);
    this.router.route('/updateitem/:foodId').post(auth.isLoggenin,auth.isRestaurant,Itemcontroller.updateitem);
    this.router.route('/deleteitem/:foodId').delete(auth.isLoggenin,auth.isRestaurant,Itemcontroller.deleteitem);
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