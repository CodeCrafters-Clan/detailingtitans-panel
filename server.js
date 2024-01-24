require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const errorHandler = require("./middlewares/errorHandler");
const { PORT, NODE_ENV } = process.env;

console.log(NODE_ENV);

connectDB();

app.use(cors(corsOptions));

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth.route"));
app.use("/users", require("./routes/user.route"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views/404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT || 5000, () =>
    console.log(`Live at http://localhost:${PORT}`)
  );
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
