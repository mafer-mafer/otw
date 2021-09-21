const db = require("./db");
const User = require("./models/User");
const Group = require("./models/Group");
const Order = require("./models/Order");
const Item = require("./models/Item");

User.belongsToMany(Group, { through: "FavoriteGroups" });
Group.belongsToMany(User, { through: "FavoriteGroups" });

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Item);
Item.belongsTo(Order);

Item.belongsTo(Group);
Group.hasMany(Item);

module.exports = {
  db,
  models: {
    User,
    Group,
    Order,
    Item,
  },
};
