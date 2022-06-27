function Restaurant(sequelize: any, DataType: any) {
  const restaurant = sequelize.define('restaurant', {

    RestaurantName: { type: DataType.STRING, required: true },
    OwnerName: { type: DataType.STRING, required: true },
    email: { type: DataType.STRING, required: true, unique: true },
    password: { type: DataType.STRING, required: true },
  })

  return restaurant;
}

export default Restaurant;