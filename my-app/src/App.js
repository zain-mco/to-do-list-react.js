// App.js
import React, { useState, useEffect } from 'react';


function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue !== "") {
      const newTask = { id: Date.now(), title: inputValue, completed: false };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <div className="form">
        <input 
          type="text" 
          className="input" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input 
          type="submit" 
          className="add" 
          value="Add Task" 
          onClick={addTask} 
        />
      </div>
      <div className="tasks">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`task ${task.completed ? 'done' : ''}`}
            onClick={() => toggleTask(task.id)}
          >
            {task.title}
            <span 
              className="del" 
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
            >
              Delete
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
