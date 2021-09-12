const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
const {
  models: { User },
} = require("../db");

const Item = require("../db/models/Item");
module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/single/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId,
      },

      include: [{ model: Item }],
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});
