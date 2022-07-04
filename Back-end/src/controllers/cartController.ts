import express, { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import food from "../models/food";
import user from "../models/user";
import cartDetails from "../models/cartDetails";
import cart from "../models/cart"
import requestInterface from "../interface/requestInterface";
// import cart from "../models/cart";
// import User from "../models/user";
import db from "../db/sequelizeConnect";

const User = db.users
const Cart = db.cart
const CartDetails = db.cartdetails
const Food = db.food

class cartController {
    // ------------ AddCart -----------------//

    public fetchcart = async (req: requestInterface, res: Response) => {

        const userId = req.user.id;
        const user = await User.findById(userId);
        if (user) {
            const userCart = await cart.findById(user.cartId).populate({ path: "cartDetailsId" });
            return res.status(200).json({ data: userCart });
        }

    }


    public addCart = async (req: requestInterface, res: Response) => {

        const { quantity, description } = req.body;
        let { foodid } = req.params;
        foodid = foodid.trim()
        const userId = req.user.id;

        if (!quantity) {
            return res.status(404).json({ data: "Please select quantity" })
        }

        const cart = await Cart.findOne({ where: { userId: userId } })

        if (!cart) {
            return res.status(404).json({ data: "Cart not found" })
        }

        const fooddata = await Food.findOne({ where: { id: foodid } })

        if (!fooddata) {
            return res.status(404).json({ data: "food not found" })
        }

        const cartDetailsData = await CartDetails.create({ quantity, description })

        let sum = cart.totalPrice + (Number(quantity) * fooddata.price)

        cart.update({ totalPrice: sum });

        await cart.addCartdetails(cartDetailsData)
        await fooddata.addCartdetails(cartDetailsData)

        res.status(200).json({ data: "Added to Cart Successfully" });

    }

    public deleteCart = async (req: requestInterface, res: Response) => {
        let { cartDetailsId } = req.params;
        cartDetailsId = cartDetailsId.trim();
        const cartdetailsdata = await CartDetails.findOne({ where: { id: cartDetailsId } })

        if (!cartdetailsdata) {
            return res.status(400).json({ data: "Cart not found" })
        }

        const cartdata = await Cart.findOne({ where: { id: cartdetailsdata.cartId } });

        if (!cartdata) {
            return res.status(400).json({ data: "Cart not found" })
        }

        const fooddata = await Food.findOne({ where: { id: cartdetailsdata.foodId } });

        if (!fooddata) {
            return res.status(400).json({ data: "Food not found" })
        }

        const sum = Number(cartdetailsdata?.quantity) * Number(fooddata?.price)

        cartdata.update({ totalPrice: cartdata.totalPrice - sum })
        cartdetailsdata.destroy();

        return res.status(200).json({ data: "Food Deleted Successfully" });

    }
    public updateCart = async (req: requestInterface, res: Response) => {

        let { cartId } = req.params;
        cartId = cartId.trim()
        const userId = req.user.id;
        console.log(cartId);
        const cartdata = await CartDetails.findOne({ where: { id: cartId } });

        if (!cartdata) {
            return res.status(404).json({ data: "Item not found" })
        }
        console.log(cartdata.cartId);

        const checkcart = await Cart.findOne({ where: { id: cartdata.cartId } });

        if (checkcart) {
            if (checkcart.userId !== userId) {
                return res.status(400).json({ data: "Item does not exist to your account" })
            }
        }

        const dataupdate = req.body;
        const { quantity } = req.body;
        if (quantity) {
            const fooddata = await Food.findOne({ where: { id: cartdata.foodId } });
            const sum = Number(quantity) - Number(cartdata.quantity);
            if (fooddata) {
                const editprice = checkcart.totalPrice + sum * Number(fooddata?.price);
                await checkcart.update({ totalPrice: editprice })
                await cartdata.update({ ...dataupdate })
            }
        }
        return res.status(200).json({ data: "Cart Update Successfully" })
    }

}

export default cartController;