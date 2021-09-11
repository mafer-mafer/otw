const Sequelize = require("sequelize");
const db = require("../db");

const Group = db.define("group", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  groupType: {
    type: Sequelize.ENUM("Boy Group", "Girl Group"),
    allowNull: false,
  },
});

module.exports = Group;
