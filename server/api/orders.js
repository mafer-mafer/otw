const router = require("express").Router();
const {
  models: { Order, User, Item },
} = require("../db");
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

router.put("/:orderId", async (req, res, next) => {
  try {
    const editedOrder = await Order.findByPk(req.params.orderId);
    await editedOrder.update(req.body);
    res.send(editedOrder);
  } catch (err) {
    next(err);
  }
});

router.post("/new/:userId", async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    const orderUser = await User.findByPk(req.params.userId);
    await orderUser.addOrder(newOrder);
    res.json(newOrder);
  } catch (err) {
    next(err);
  }
});

router.delete("/:orderId", async (req, res, next) => {
  try {
    const deleteOrder = await Order.findByPk(req.params.orderId);
    await deleteOrder.destroy();
    res.send(deleteOrder);
  } catch (err) {
    next(err);
  }
});
