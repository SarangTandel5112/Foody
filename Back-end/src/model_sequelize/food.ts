function Food(sequelize: any, DataType: any) {
  const food = sequelize.define('food', {

    name: {
      type: DataType.STRING,
      required: true
  },
  description: {
      type: DataType.STRING,
      required: true
  },
  price: {
      type: DataType.INTEGER,
      required: true
  },
  rating: {
      type: DataType.INTEGER,
  },
  status: {
      type: DataType.STRING,
      required: true
  },
  })

  return food;
}

export default Food;