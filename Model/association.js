const User = require("./User");
const Category = require("./Categorie");
const Task = require("./Task");
const RefreshToken = require("./RefreshToken");

User.hasMany(RefreshToken, {
    foreignKey: "user_id"
});

RefreshToken.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasMany(Task, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Task.belongsTo(User, {
    foreignKey: "user_id"
});

Category.hasMany(Task, {
    foreignKey: "category_id"
});

Task.belongsTo(Category, {
    foreignKey: "category_id",
    onDelete: "SET NULL"
});

module.exports = {
    User,
    Category,
    Task,
    RefreshToken
};