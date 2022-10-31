import { useEffect, useState, Fragment } from "react";
import { FaPlus } from "react-icons/fa";

import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  createStyles,
  useMantineTheme,
  Group,
  Center,
  Stack,
  Input,
  Button,
  Checkbox,
  Title
} from "@mantine/core";

export default function HomePage() {
  let token = localStorage.getItem("token");

  async function getTasks() {
    let apiCall = "http://localhost:4000/todo/notemerald@utexas.edu";
    const response = await fetch(apiCall, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      /*headers: {
        Authorization: `Bearer ${token}`
      },
      */
      redirect: "follow",
      referrerPolicy: "no-referrer"
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error();
        }
        return response.json();
      })
      .then((response) => {
        let getTodo = []; //how do i optimize this
        response.forEach((data) => {
          getTodo.push({ name: data.todo, finished: false, uid: data.uid });
        });
        setTasks(getTodo);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    // Update the document title using the browser API
    getTasks();
  }, []);

  // taskName: a string of the name of task that you want to add; setToDo: a function that allows you to edit the taskName
  const [taskName, setTaskName] = useState("");

  async function addTask() {
    let apiCall = "http://localhost:4000/todo/";

    if (taskName) {
      const response = await fetch(apiCall, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${token}`
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ email: "notemerald@utexas.edu", todo: taskName })
      })
        .then((response) => {
          console.log(response.status);
          if (response.status !== 201) {
            throw new Error();
          }
          tasks.includes(taskName)
            ? alert("Task already exists")
            : setTasks(tasks.concat({ name: taskName, completed: false }));
          setTaskName("");
          return response.json();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  async function deleteTask(task) {
    let apiCall = "https://localhost:4000/todo/";
    const response = await fetch(apiCall, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ uid: task.uid })
    })
      .then((response) => {
        console.log(response);
        if (response.status !== 200) {
          throw new Error();
        } else {
          const newTasks = tasks.filter((obj) => obj.name !== task.name);
          setTasks(newTasks);
          // console.log(newTasks);
        }
        return response.json();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  //has to create a new array because original state is a const and can't explicitly modify it
  function updateTask(name) {
    const newTasks = tasks.map((task) => {
      if (name === task.name) {
        task.finished = !task.finished;
        deleteTask(task);
        return; //skip over
      }
      return task;
    });
    setTasks(newTasks);
  }

  function getSummary() {
    let unfinishedTasks = 0;
    unfinishedTasks = tasks.length;
    /*tasks.forEach((task) => {
      if (task.finished === false) {
        unfinishedTasks += 1;
      }
    });
    */
    if (unfinishedTasks === 1) {
      return <Title order={2}>You have 1 unfinished task</Title>;
    } else if (unfinishedTasks >= 1) {
      return (
        <Title order={2}>You have {unfinishedTasks} tasks left to do</Title>
      );
    }
  }

  return (
    <Stack align="center" justify="center" p="xl">
      {getSummary()}
      <Group>
        <Input
          value={taskName}
          placeholder="Type your task here"
          onChange={(event) => setTaskName(event.target.value)}
        ></Input>
        <Button rightIcon={<FaPlus />} onClick={() => addTask()}>
          Add
        </Button>
      </Group>
      {tasks.length < 1 && <></>}
      <Stack>
        {tasks.map((task, index) => (
          <Checkbox
            checked={task.finished}
            key={task.name}
            index={index}
            label={task.name}
            onChange={() => updateTask(task.name)}
          ></Checkbox>
        ))}
      </Stack>
    </Stack>
  );

  // addTask: adds a task to toDo by adding the taskName
  /*function addTask() {
    // makes sure that taskName is not blank
    if (taskName) {
      // makes sure that taskName is a new task
      tasks.includes(taskName)
        ? alert("Task already exists")
        : setTasks(tasks.concat({ name: taskName, completed: false }));
      setTaskName("");
      postTask(taskName);
    }
  }
  */
}
