import React, { useState, useEffect } from "react";
import axios from 'axios'
// import SearchBar from './components/SearchBar';
interface ResponseData {
  task: string;
  date: string;
  isDone: boolean;
}


const endPoint ="https://debttracker.burgeon8services.xyz/api/collections/todos/records"

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  console.log(tasks)

  const handleInputChange = (e: any) => {
    console.log(e.target.value);
  };
  const handleSubmit = () => {

  }

  const getTasks = async()=>{
    try {
      let response = await axios.get(endPoint)
      console.log("uuuu",response)
      let { items } = response.data
      if(items?.length > 0)
       setTasks(items)
    } catch (error) {
      console.log(error)
    }
  }

  const postTask=async()=>{
    try {
      let response = await axios.post(endPoint, {

      })
    } catch (error) {
      
    }
  }
  

  

  return (
    <div className="flex justify-center mt-[2rem] flex-col items-center gap-[2rem]">
      <h1>Total Task (3)</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input onChange={handleInputChange} className="w-[30rem] p-2 h-[3rem] border border-sky-500 rounded outline-none	" type="search" name="" id="" placeholder="Add a task" />
        <button onClick={()=> console.log('click')} className="bg-indigo-500 px-4 h-[3rem] rounded text-white">ADD</button>
      </form>

      <div className="flex gap-[20rem]">
        
        {tasks.map((task) => (
          <div>

          <div>
          <h5>{task}</h5>
          <h3>This is a new Task</h3>
        </div>
        <p>Completed</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
