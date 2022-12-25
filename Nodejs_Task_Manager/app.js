const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());
app.use(express.static("public"));

// link url to route
app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

// routes

// app.get("api/v1/tasks")      - get all tasks
// app.post("api/v1/tasks")     - create a new task
// app.get("api/v1/tasks/:id")  - get a specific task
// app.patch("api/v1/tasks/:id")  - update a specific task
// app.delete("api/v1/tasks/:id")  - delete a specific task

app.get("/hello", (req, res) => {
  res.send("Task Manager app");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
