const sequelize = require('../db')

const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tgId: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    
})
const BasketDish = sequelize.define('basket_dish', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Dish = sequelize.define('dish', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const DishInfo = sequelize.define('dish_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const DishType = sequelize.define('dish_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketDish)
BasketDish.belongsTo(Basket)

BasketDish.hasOne(Dish)
Dish.belongsTo(BasketDish)

DishType.hasMany(Dish)
Dish.belongsTo(DishType)

Dish.hasOne(DishInfo, {as: 'info'})
DishInfo.belongsTo(Dish)

module.exports = {
    User,
    Dish,
    DishInfo,
    DishType,
    Basket,
    BasketDish
}