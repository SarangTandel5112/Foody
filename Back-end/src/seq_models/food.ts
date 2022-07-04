function addFood(sequelize: any, DataType: any) {
    const foodAdd = sequelize.define('food', {
  
      name: { type: DataType.STRING, required: true },
      description: { type: DataType.STRING, required: true },
      price: { type: DataType.INTEGER,required: true },
      rating: { type: DataType.INTEGER, required: true},
      status: { type: DataType.STRING, required: true },
    })
  
    return foodAdd;
  }
  
  export default addFood