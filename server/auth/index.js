const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User or Email already exists");
    } else {
      next(err);
    }
  }
});

router.put("/editme", async (req, res, next) => {
  try {
    const userToChange = await User.findByToken(req.body.content.token);
    await userToChange.update(req.body.content.edited);
    res.send({ token: await userToChange.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User or Email already exists");
    } else if (
      err.message === "Validation error: Validation isEmail on email failed"
    ) {
      res.status(500).send("Invalid Email");
    } else {
      console.log("message is", err.message);
      next(err);
    }
  }
});

router.put("/editpw", async (req, res, next) => {
  try {
    const confirmToken = {
      token: await User.authenticate(req.body.content.currentData),
    };
    if (confirmToken.token.length) {
      const userToChange = await User.findByToken(req.body.content.token);
      await userToChange.update({ password: req.body.content.newPW });
      res.send({ token: await userToChange.generateToken() });
    }
  } catch (err) {
    // next(err);
    res.status(401).send("Incorrect password");
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
