const { Model, DataTypes } = require("sequelize");
const sequelize = require("../DataBase/connect");

class RefreshToken extends Model {}

RefreshToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        refreshToken: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        expire: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "refresh_tokens",
        timestamps: true
    }
);

module.exports = RefreshToken;