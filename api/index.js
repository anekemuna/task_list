import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { createTasks, fetchTasks, updateTasks, deleteTasks } from "./task.js";

const app = express();
const port = 3001;

app.use(express.json()); // for grabbing JSON data from the body of the request

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/task", async (req, res) => {
  // this is the route for fetching all tasks
  try {
    const tasks = await fetchTasks();
    res.send(tasks.Items);
  } catch (error) {
    res.status(400).send(`Error fetching tasks: ${error}`); // send an error message if the fetch fails
  }
});

app.post("/task", async (req, res) => {
  // create a new task
  try {
    const task = req.body;
    const response = await createTasks(task);
    res.send(response);
  } catch (error) {
    res.status(400).send(`Error creating tasks: ${error}`);
  }
});

app.put("/task/:id", async (req, res) => {
  // update a task
  try {
    const task = req.body;
    const response = await updateTasks(task);
    res.send(response);
  } catch (error) {
    res.status(400).send(`Error updating tasks: ${error}`);
  }
});

app.delete("/task/:id", async (req, res) => {
  //delete a task
  try {
    const { id } = req.params;
    const response = await deleteTasks(id);
    res.send(response);
  } catch (error) {
    res.status(400).send(`Error deleting tasks: ${error}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
