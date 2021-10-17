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

router.get("/:email", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.params.email,
      },
      attributes: ["id", "username"],
    });
    console.log(user);
    res.json(user);
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
