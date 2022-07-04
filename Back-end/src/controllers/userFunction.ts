import { Response } from "express";
import requestInterface from "../interface/requestInterface";
import db from "../db/sequelizeConnect";

const food = db.food
const restaurant = db.restaurant

class userFunction {

    public searchFunction = async (req: requestInterface, res: Response) => {
        const { key } = req.params;
        console.log(key);
        const allFoods = await food.findAll({ raw: true })
        // res.send(allFoods)
        const searchedFood = allFoods.filter((onefood: any) => {
            for (let data in onefood) {
                // console.log(onefood[data]);
                if (onefood[data]) {
                    let prop = onefood[data].toString();
                    if (prop.includes(key)) {
                        // console.log(onefood);
                        return onefood;
                    }
                }
            }
        });

        console.log(searchedFood);
        res.send(searchedFood);

    }

}

export default userFunction;