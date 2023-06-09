const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const ImageKit = require("imagekit");
const authRouter = require("./routers/authRouter");
const categoryRouter = require("./routers/categoryRouter");
const couponRouter = require("./routers/couponRouter");
const itemRouter = require("./routers/itemRouter");
const userRouter = require("./routers/userRouter");
const { authMiddleware } = require("./middlewares/auth-middleware");
const orderRouter = require("./routers/orderRouter");
const { adminMiddleware } = require("./middlewares/admin-middleware");
const adminRouter = require("./routers/adminRouter");
require("dotenv").config();

const imagekit = new ImageKit({
  urlEndpoint: process.env.NX_IMAGE_KIT_URL,
  publicKey: process.env.NX_IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.NX_IMAGE_KIT_PRIVATE_KEY,
});

app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.NX_CLIENT_LINK,
      process.env.NX_CLIENT_HOST,
      process.env.NX_CLIENT_ADMIN,
      "http://localhost:4203",
      "http://localhost:4200",
      "http://localhost:4204",
    ],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

const db_link = process.env.NX_MONGODB_URL;

mongoose
  .connect(db_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function (db) {
    console.log("db is connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const PORT = process.env.NX_PORT_API || 5000;

server.listen(PORT, () => {
  console.log("Listening on port `" + PORT + "`");
});

app.get("/auth", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.use("/user", authRouter);
app.use("/category", categoryRouter);
app.use("/coupon", couponRouter);
app.use("/item", itemRouter);
app.use("/user", authMiddleware, userRouter);
app.use("/order", authMiddleware, orderRouter);
app.use("/admin", adminMiddleware, adminRouter);

app.get("/", function (req, res) {
  res.send("server is running successfully ! ");
});
