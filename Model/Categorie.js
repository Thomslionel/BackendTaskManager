const sequelize = require("../DataBase/connect");
const { DataTypes, Model } = require("sequelize");

class Categorie extends Model {}

Categorie.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users", // En Sequelize, par défaut, le nom de la table devient pluriel ("users")
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    createdAt: { // Correction ici (pas de parenthèses à NOW)
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},
{
    tableName: "categorie",
    sequelize
});

module.exports = Categorie;