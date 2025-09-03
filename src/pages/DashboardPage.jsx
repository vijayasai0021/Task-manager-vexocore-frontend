// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react'; 
import api from '../services/api';
import TaskItem from '../components/TaskItem';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // Fetch tasks when the component loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks'); 
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const response = await api.post('/tasks', { title });
      setTasks([...tasks, response.data]); // ✅ FIX 3: Corrected spelling of 'response'
      setTitle(''); // Clear the input field
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Handle toggling task status
  const handleToggleStatus = async (taskToUpdate) => {
    try {
      const response = await api.put(`/tasks/${taskToUpdate._id}`, {
        completed: !taskToUpdate.completed,
      });
      setTasks(
        tasks.map((task) => (task._id === taskToUpdate._id ? response.data : task))
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  //handle Edit Tasks
  const handleEditTask = async(taskId,newTitle)=>{
    try{
      const response = await api.put(`/tasks/${taskId}`,{title:newTitle});
      setTasks(
        tasks.map((task)=> (task._id===taskId ? response.data :task))
      );
    }catch(err){
      console.error("Failed to edit task:",err)
    }
  }

  return (
    <div>
      <h1>Task Dashboard</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
          required
        />
        <button type="submit">Add Task</button>
      </form>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteTask}
              onEdit ={handleEditTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardPage;