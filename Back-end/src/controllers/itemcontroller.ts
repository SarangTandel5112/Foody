import { Response } from "express";
import requestInterface from "../interface/requestInterface";
import Restaurant from "../models/restaurant";

import db from "../db/sequelizeConnect";

const food = db.food
const restaurant = db.restaurant

class itemcontroller {

    public viewallitem = async (req: requestInterface, res: Response) => {
        const resId = 1;
        const foodData = await food.findAll({ where: { restaurantId: resId } })
        console.log(foodData);
        res.send(foodData);
    }

    public additem = async (req: requestInterface, res: Response) => {
        const resId = req.user.id;
        // console.log(req.user.id);
        // return res.send(req.user.id);

        const { name, description, price, rating, status } = req.body;

        if (!name) {
            return res.status(404).json({ data: "name not found" })
        }
        if (!description) {
            return res.status(404).json({ data: "description not found" })
        }
        if (!price) {
            return res.status(404).json({ data: "price not found" })
        }
        if (!status) {
            return res.status(404).json({ data: "status not found" })
        }

        const newitem = await food.create({
            name,
            description,
            price,
            rating,
            status,
        })
        const restaurantdata = await restaurant.findOne({ where: { id: resId } })
        // console.log(restaurantdata);
        await restaurantdata.addFood(newitem)

        // const result = await Restaurant.create({where:{id:req.user.id}}, { $push: { items: newitem._id } }, { new: true })
        // newitem.save();
        res.status(200).json({ data: "Item added sucessfully" + newitem })
    }

    public updateitem = async (req: requestInterface, res: Response) => {
        const userId = req.user.id;
        const { foodId } = req.params;

        const updatefood = await food.findOne({ where: { id: foodId } })
        if (!updatefood) {
            return res.status(404).json({ data: "food not found" });
        }
        if (updatefood.restaurantId !== userId) {
            return res.status(404).json({ data: "food not Exist for this account" });
        }

        const updateDish = req.body;
        await food.update({ ...updateDish }, { where: { id: foodId } });
        return res.status(200).json({ data: "Food Update Successfully" });
    }

    public deleteitem = async (req: requestInterface, res: Response) => {
        const { foodId } = req.params;
        const userId = req.user.id;
        const updatefood = await food.findOne({ where: { restaurantId: userId } });
        if (!updatefood) {
            return res.status(404).json({ data: "food not found" });
        }
        if (updatefood.restaurantId !== userId) {
            return res.status(404).json({ data: "food not Exist for this account" });
        }
        await updatefood.destroy();
        // await Restaurant.findByIdAndUpdate(userId, { $pull: { items: foodId } })
        // await food.findByIdAndDelete(foodId);
        return res.status(200).json({ data: "Item Deleted Successfully" });
    }
}

export default itemcontroller;