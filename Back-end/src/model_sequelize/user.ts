function createUser(sequelize: any, DataTypes: any) {
    const Users = sequelize.define('users', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            required: true
        },
        name: {
            type: DataTypes.STRING,
            require: true
        },
        password: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        }
    })
    return Users;
}

export default createUser;