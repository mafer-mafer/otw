const router = require("express").Router();
const {
  models: { Group },
} = require("../db");
const {
  models: { User },
} = require("../db");

const Item = require("../db/models/Item");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const groups = await Group.findAll();
    res.json(groups);
  } catch (err) {
    next(err);
  }
});

router.get("/boy", async (req, res, next) => {
  console.log("in api");
  try {
    const groups = await Group.findAll({
      where: {
        groupType: "Boy Group",
      },
    });
    res.json(groups);
  } catch (err) {
    next(err);
  }
});

router.get("/girl", async (req, res, next) => {
  console.log("hii");
  try {
    const groups = await Group.findAll({
      where: {
        groupType: "Girl Group",
      },
    });
    res.json(groups);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const groups = await Group.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Item }],
    });
    res.json(groups);
  } catch (err) {
    next(err);
  }
});

router.get("/name/:id", async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.id);
    res.json(group.name);
  } catch (err) {
    next(err);
  }
});

router.put("/:groupName/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const group = await Group.findOne({
      where: {
        name: req.params.groupName,
      },
    });
    await user.addGroup(group);
    res.send(group);
  } catch (err) {
    next(err);
  }
});

router.put("/rmv/:groupId/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const group = await Group.findByPk(req.params.groupId);
    await user.removeGroup(group);
    res.send(group);
  } catch (err) {
    next(err);
  }
});
