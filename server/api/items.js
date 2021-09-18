const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
const {
  models: { User },
} = require("../db");

const {
  models: { Item },
} = require("../db");

module.exports = router;

router.post("/new/:orderId", async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);
    const theOrder = await Order.findByPk(req.params.orderId);
    await theOrder.addItem(newItem);
    res.json(newItem);
  } catch (err) {
    next(err);
  }
});

router.put("/:itemId", async (req, res, next) => {
  try {
    const editItem = await Item.findByPk(req.params.itemId);
    await editItem.update(req.body);
    res.send(editItem);
  } catch (err) {
    next(err);
  }
});

router.delete("/:itemId", async (req, res, next) => {
  try {
    const deleteItem = await Item.findByPk(req.params.itemId);
    await deleteItem.destroy();
    res.send(deleteItem);
  } catch (err) {
    next(err);
  }
});
