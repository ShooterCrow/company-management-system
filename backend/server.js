require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logger");
const connectDB = require("./config/dbConnect");
const mongoose = require("mongoose");
const { logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { connect } = require("http2");
const PORT = process.env.PORT || 3000;

connectDB()

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));

app.use("/auth", require("./routes/authRoutes"));

app.use("/users", require("./routes/userRoutes"));

app.use("/tasks", require("./routes/taskRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to Database")
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
})

mongoose.connection.on("error", err => {
    console.log(err)
    logEvents(`${err.log}: ${err.code}\t${err.syscall}\tab${err.hostname}`,
        "mongoError.log"
    )
})