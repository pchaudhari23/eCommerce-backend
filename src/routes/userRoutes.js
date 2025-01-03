require("dotenv").config();
const getDb = require("../db/database").getDb;
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

//SIGN UP:
router.post("/add-user", async (req, res) => {
  try {
    const db = getDb();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      username: req.body.username,
      password: hashedPassword,
    };

    db.collection("users")
      .insertOne(user)
      .then((result) => {
        console.log(result);
        return res.send(result);
      })
      .catch((e) => console.log(e));
  } catch (e) {
    res.json({ message: "Error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const db = getDb();
    const user = await db
      .collection("users")
      .findOne({ username: req.body.username });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    const accessToken = jwt.sign(
      JSON.stringify(user),
      process.env.TOKEN_SECRET
    );
    if (match) {
      res.json({ accessToken: accessToken });
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
