const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/User.routes");
const { blogRouter } = require("./Routes/Blog.routes");
const { authenticate } = require("./Middlewares/authenticate");
app.use(express.json());
app.get("/", (req, res) => {
  res.send("HELLO FROM HOME PAGE!");
});

app.use("/user", userRouter);
app.use(authenticate);
app.use("/blog", blogRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("<><><><> Connected to DB!!!! <><><><>");
    console.log(
      `<><><> ****Server is running on port ${process.env.port}!****<><><>`
    );
  } catch (err) {
    console.log("Some error in connecting to db !!", err);
  }
});
