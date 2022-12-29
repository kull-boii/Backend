require("dotenv").config();

const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");

// Routers
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const whoamiRouter = require("./routes/whoami");

// Middleware
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

connectDB(process.env.MONGO_URI);

// Routes
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/me", whoamiRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Listening on port ${port}`));
