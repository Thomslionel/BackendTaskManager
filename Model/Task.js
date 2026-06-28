const sequelize = require("../DataBase/connect");
const { DataTypes, Model } = require("sequelize");

class Task extends Model {}

Task.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT
        },

        status: {
            type: DataTypes.ENUM("TODO", "IN_PROGRESS", "DONE"),
            allowNull: false,
            defaultValue: "TODO"
        },

        priority: {
            type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),
            allowNull: false,
            defaultValue: "MEDIUM"
        },

        due_date: {
            type: DataTypes.DATE
        },

        completed_at: {
            type: DataTypes.DATE
        },

        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        category_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },

        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },

        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: "Task",
        tableName: "tasks",
        timestamps: false
    }
);

module.exports = Task;