const router = require("express").Router();

const {
  models: { Order, Item, User, Group },
} = require("../db");

module.exports = router;

router.get("/:userId/:groupId", async (req, res, next) => {
  try {
    const orderItems = await Order.findAll({
      attributes: ["id", "status", "dateOrdered"],
      where: {
        userId: req.params.userId,
      },
      include: [
        {
          model: Item,
          where: {
            groupId: req.params.groupId,
          },
        },
      ],
    });
    res.send(orderItems);
  } catch (err) {
    next(err);
  }
});

router.post("/new/:orderId", async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);
    const theOrder = await Order.findByPk(req.params.orderId);
    await theOrder.addItem(newItem);

    const theGroup = await Group.findOne({
      where: {
        name: req.body.groupName,
      },
    });
    await theGroup.addItem(newItem);
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
