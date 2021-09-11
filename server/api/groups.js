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
