const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./config/db");

const userRouter = require("./routes/user.route");
const iconRouter = require("./routes/icon.router");

const app = express();

app.use(cors());

//body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cookie parser middleware
app.use(cookieParser());

//route path
app.use("/api/users", userRouter);
app.use("/api/icons", iconRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});

//route error handle
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

// Server error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
});
module.exports = app;
