import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import moment from 'moment'
// import SearchBar from './components/SearchBar';
interface ResponseData {
  id: string;
  created: string;
  task: string;
  date: string;
  isDone: boolean;
}

const endPoint = "https://debttracker.burgeon8services.xyz/api/collections/todos/records";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  console.log("ddd", tasks);

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    postTask(input);
    setInput("");
  };

  const getTasks = async () => {
    try {
      let response = await axios.get(endPoint);
      let { items } = response.data;
      console.log("uuuu", items);
      if (items?.length > 0) {
        setTasks(items);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const postTask = async (input: string) => {
    try {
      console.log("ffff",input)
      const payload = {
        task: input
      }
      let postResponse: ResponseData = await axios.post(endPoint, payload);
      console.log("aaa", postResponse);
      getTasks()
    } catch (error) {
      console.log(error)
    }
  };

  const updateTask = async () => {
    try {
      
    } catch (error) {
      console.log(error)
    }

  }
  const deleteTask = async () => {
    try {
      
    } catch (error) {
      console.log(error)
      
    }
  }
  const fetchTodos = () => {
    getTasks();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex mt-[2rem] flex-col gap-[2rem] justify-center px-[20%] mt-[6rem]">
      <h1 className="text-xl">Total Task ({tasks.length})</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input onChange={handleInputChange} className="w-[100%] p-2 h-[3rem] border border-sky-500 rounded outline-none	" type="text" value={input} id="" placeholder="Add a task" />
        <button onClick={() => postTask} className="bg-indigo-500 px-6 h-[3rem] rounded text-white">
          ADD
        </button>
      </form>

      <div className="flex flex-col justify-between ">
        {tasks?.map((item: ResponseData) => {
          const { id, task, created } = item;
          return (
            <div className="flex justify-between border-b-2 py-[1rem] border-grey-200">
              <div className="">
                <h5>{moment(created).format("MMMM DD, YYYY")}</h5>
                <p>{task}</p>
              </div>
              <div className="flex gap-[.2rem]">
                <button className="bg-green-500 px-2 h-[2rem] rounded">Done</button>
                <button className="bg-red-500 px-2 h-[2rem] rounded">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
