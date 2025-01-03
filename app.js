require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoConnect = require("./src/db/database").connectToDatabase;
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const port = process.env.PORT || 8000;

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//   })
// );

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend live !!!");
});

app.use("/api", productRoutes);
app.use("/user", userRoutes);

mongoConnect(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
