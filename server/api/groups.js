const router = require("express").Router();
const {
  models: { Group },
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
      attributes: ["name", "id"],
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
      attributes: ["name", "id"],
    });
    res.json(groups);
  } catch (err) {
    next(err);
  }
});

router.get("/one/:id", async (req, res, next) => {
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
