const sequelize = require("../DataBase/connect");
const { DataTypes, Model } = require("sequelize");

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: { 
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW 
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize, 
        modelName: "user", 
    }
);

module.exports = User;