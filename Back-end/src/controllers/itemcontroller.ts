import { Response } from "express";
import foodinterface from "../interface/food";
import requestInterface from "../interface/requestInterface";
import food from "../models/food";
import Restaurant from "../models/restaurant";


class itemcontroller {

    public viewItem = async (req: requestInterface, res: Response) => {
        const { foodId } = req.params;
        const userId = req.user.id;
        const fooddata = await food.findById(foodId).select(["-createdAt", "-updatedAt"])
        console.log(fooddata);
        if (!fooddata) {
            return res.status(404).json({ data: "food not found" });
        }
        if (fooddata.restaurantId.toString() !== userId) {
            return res.status(404).json({ data: "food not Exist for this account" });
        }


    }

    public additem = async (req: requestInterface, res: Response) => {
        const resId = req.user.id;
        const { name, description, price, status } = req.body;

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

        const newitem = await new food({
            name,
            description,
            price,
            status,
            restaurantId: resId
        })
        const result = await Restaurant.findByIdAndUpdate(req.user.id, { $push: { items: newitem._id } }, { new: true })
        newitem.save();
        res.status(200).json({ data: "Item added sucessfully" })
    }

    public updateitem = async (req: requestInterface, res: Response) => {
        const userId = req.user.id;
        const { foodId } = req.params;

        const updatefood = await food.findById(foodId);
        if (!updatefood) {
            return res.status(404).json({ data: "food not found" });
        }
        if (updatefood.restaurantId.toString() !== userId) {
            return res.status(404).json({ data: "food not Exist for this account" });
        }

        const updateDish = req.body;
        await food.findByIdAndUpdate(foodId, { ...updateDish })
        // for (const property in updateDish) {
        //     updatefood[property] = updateDish[property];
        // }
        // updatefood.save();
        return res.status(200).json({ data: "Food Update Successfully" });
    }

    public deleteitem = async (req: requestInterface, res: Response) => {
        const { foodId } = req.params;
        const userId = req.user.id;
        const updatefood = await food.findById(foodId);
        if (!updatefood) {
            return res.status(404).json({ data: "food not found" });
        }
        if (updatefood.restaurantId.toString() !== userId) {
            return res.status(404).json({ data: "food not Exist for this account" });
        }
        await Restaurant.findByIdAndUpdate(userId, { $pull: { items: foodId } })
        await food.findByIdAndDelete(foodId);
        return res.status(200).json({ data: "Item Deleted Successfully" });
    }
}

export default itemcontroller;