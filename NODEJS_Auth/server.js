require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const registerRouter = require("./routes/register");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

connectDB(process.env.MONGO_URI);

// Routes
app.use("/api/v1/register", registerRouter);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Listening on port ${port}`));
