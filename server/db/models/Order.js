const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  seller: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  platform: {
    type: Sequelize.ENUM(["Instagram", "Twitter", "eBay", "Mercari", "Other"]),
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM(["Purchase", "Trade", "Group Order"]),
    allowNull: false,
  },
  dateOrdered: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  onHand: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  onHandDate: {
    type: Sequelize.STRING,
  },
  sellerLocation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shippingType: {
    type: Sequelize.ENUM(["Stamped", "Tracked", "EMS", "DHL", "Boat"]),
    defaultValue: "Stamped",
    allowNull: false,
  },
  trackingNumber: {
    type: Sequelize.STRING,
  },
  shipped: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  dateShipped: {
    type: Sequelize.DATEONLY,
  },
  arrived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  proofGiven: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
