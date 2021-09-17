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
  status: {
    type: Sequelize.ENUM([
      "Order Placed",
      "Waiting for Shipment",
      "Waiting for Pre-Order Release",
      "Waiting for Seller to Receive",
      "Waiting for GOM to Receive",
      "Waiting for Proxy to Ship",
      "Waiting for GOM to Ship",
      "Waiting for K Address to Ship",
      "Waiting for J Address to Ship",
      "Waiting for C Address to Ship",
      "Waiting for USA Address to Ship",
      "Seller On Hitaus",
      "Shipped",
      "Shipped to Seller",
      "Shipped to GOM",
      "Shipped to Proxy",
      "Shipped to K Address",
      "Shipped to J Address",
      "Shipped to C Address",
      "Shipped to USA Address",
      "In Customs",
      "Arrived",
      "Arrived to Proxy",
      "Arrived at K Address",
      "Arrived at J Address",
      "Arrived at C Address",
      "Arrived at USA Address",
      "Proof Sent",
      "Other",
    ]),
    allowNull: false,
    defaultValue: "Order Placed",
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
  notes: {
    type: Sequelize.STRING,
  },
});

module.exports = Order;
