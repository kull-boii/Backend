const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const connectDb = require("./db/connect");
require("dotenv").config();

const tasks = require("./routes/tasks");

//middleware
app.use(express.json());
app.use(express.static("public"));

//routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/tasks", tasks);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
