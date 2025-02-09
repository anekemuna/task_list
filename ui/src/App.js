import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AddTaskForm } from "./components/AddTaskForm";
import { Task } from "./components/Task";
import axios from "axios";
import { API_URL } from "./utils";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [tasks, setTasks] = useState([]); // set the initial state of task to an empty array

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL); // make a GET request to the /task route
      setTasks(data); // set the state of task to the response data
    } catch (error) {
      console.error(`App: Error fetching tasks: ${error}`); // log an error message if the fetch fails
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks} />
      {tasks.map((task) => (
        <Task task={task} key={task.id} fetchTasks={fetchTasks} />
      ))}
    </ThemeProvider>
  );
}
