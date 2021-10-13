const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  seller: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  platform: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateOrdered: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Order Placed",
  },
  sellerLocation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shippingType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  trackingNumber: {
    type: Sequelize.STRING,
  },
  dateShipped: {
    type: Sequelize.DATEONLY,
  },
  note: {
    type: Sequelize.STRING,
  },
  hasShipped: {
    type: Sequelize.BOOLEAN,
  },
  mailingCompany: {
    type: Sequelize.STRING,
  },
});

module.exports = Order;
