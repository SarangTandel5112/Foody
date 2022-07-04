function addRestaurant(sequelize: any, DataType: any) {
    const restaurantAdd = sequelize.define('restaurant', {
  
      RestaurantName: { type: DataType.STRING, required: true },
      OwnerName: { type: DataType.STRING, required: true },
      email: { type: DataType.STRING, required: true, unique: true },
      password: { type: DataType.STRING, required: true },
    })
  
    return restaurantAdd;
  }
  
  export default addRestaurant;