const router = require("express").Router();
const {
  models: { Group },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const groups = await Group.findAll();
    res.json(groups);
  } catch (err) {
    next(err);
  }
});

router.get("/boygroup", async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      where: {
        type: "Boy Group",
      },
    });
    res.json(groups);
  } catch (err) {
    next(err);
  }
});

router.get("/girlgroup", async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      where: {
        type: "Girl Group",
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

// router.get("/:userId", async (req, res, next) => {
//   try {
//     const groups = await Group.findAll({
//         where: {

//         }
//     });
//     res.json(groups);
//   } catch (err) {
//     next(err);
//   }
// });
