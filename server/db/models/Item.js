const Sequelize = require("sequelize");
const db = require("../db");

const Item = db.define("item", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM([
      "Photocard",
      "Album",
      "Lightstick",
      "Concert",
      "Misc.",
    ]),
    allowNull: false,
  },
  damage: {
    type: Sequelize.STRING,
  },
  preOrder: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  releaseDate: {
    type: Sequelize.DATEONLY,
  },
});

module.exports = Item;
