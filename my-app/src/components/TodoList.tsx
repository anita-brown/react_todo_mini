import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { ResponseData } from "../utils";
import endPoint from "../utils";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    postTask(input);
    setInput("");
  };

  useEffect(() => {
    getTasks();
  }, []);
  const getTasks = async () => {
    try {
      let response = await axios.get(endPoint);
      let { items } = response.data;
      if (items?.length > 0) {
        setTasks(items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postTask = async (input: string) => {
    try {
      const payload = {
        task: input,
      };
      let postResponse: ResponseData = await axios.post(endPoint, payload);
      getTasks();
      return postResponse;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id: string) => {
    try {
      const update = {
        isDone: true,
      };
      let updateResponse: ResponseData = await axios.patch(`${endPoint}/${id}`, update);
      getTasks();
      return updateResponse;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async (id: string) => {
    try {
      let deleteResponse = await axios.delete(`${endPoint}/${id}`);
      getTasks();
      return deleteResponse;
    } catch (error) {
      console.log(error);
    }
  };

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
          const { id, task, isDone, created } = item;
          return (
            <div key={id} className="flex justify-between border-b-2 py-[1rem] border-grey-200">
              <div className="">
                <h5>{moment(created).format("MMMM DD, YYYY")}</h5>
                <p>{task}</p>
              </div>

              {!isDone ? (
                <div className="flex gap-[.2rem]">
                  <button onClick={() => updateTask(id)} className={"bg-green-500 px-2 h-[2rem] rounded "}>
                    Done
                  </button>
                  <button onClick={() => deleteTask(id)} className="bg-red-500 px-2 h-[2rem] rounded">
                    Delete
                  </button>
                </div>
              ) : (
                <p>Completed</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
