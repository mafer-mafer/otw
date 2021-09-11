const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const Group = require("../db/models/Group");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/groups", async (req, res, next) => {
  try {
    const users = await User.findOne({
      attributes: ["id", "username"],
      where: {
        id: req.params.userId,
      },
      include: [{ model: Group }],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
