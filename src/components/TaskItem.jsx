import { useState } from "react";
import React  from 'react';

const TaskItem = ({task, onToggleStatus,onDelete,onEdit})=>{
    const [isEditing,setIsEditing]  =useState(false);
    const [newTitle,setNewTitle] = useState(task.title);

    const handleSave = () =>{
        onEdit(task._id,newTitle);
        setIsEditing(false);
    };
    return (
        <li className='task-item'>
            {isEditing ? (
                //Editing view
                <div className='task-content'>
                    <input
                    type='text'
                    value={newTitle}
                    onChange={(e)=>setNewTitle(e.target.value)}
                    className='edit-input'
                    />
                </div>
            ): (
                //default view
                <div className='task-content'>
                    <input
                    type='checkbox'
                    checked={task.completed}
                    onChange={()=>onToggleStatus(task)}
                    />
                    <span style ={{textDecoration: task.completed ? 'line-through':'none'}}>
                        {task.title}
                    </span>
                </div>
            )}

            <div className='task-actions'>
                {isEditing ? (
                    <button onClick={handleSave} className='save-btn'>Save</button>
                ):(
                    <button onClick={()=>setIsEditing(true)} className='edit-btn'>Edit</button>
                )}
                <button onClick={()=>onDelete(task._id)} className='delete-btn'>Delete</button>
            </div>
        </li>
    );
};

export default TaskItem;
