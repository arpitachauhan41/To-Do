import React, { useState, useRef } from 'react';
import TodoItem from "./TodoItem";

function TodoList() {
    const [tasks, setTasks] = useState([
        
    ]);
    const [text, setText] = useState('');
    const textAreaRef = useRef(null); 
    function addTask() {
        if (text.trim() === '') 
            return;
        const newTask = { id: Date.now(), text, completed: false };
        setTasks([...tasks, newTask]);
        setText('');
        if (textAreaRef.current) {
            textAreaRef.current.innerText = '';
        }
    }
    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }
    function toggleCompleted(id) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            } else {
                return task;
            }
        }));
    }
    function handleInputChange(event) {
        setText(event.target.innerText);
    }
    return (
        <div className="todo-list">
            {tasks.map(task => (
                <TodoItem key={task.id} task={task} deleteTask={deleteTask} toggleCompleted={toggleCompleted} />
            ))}
            <p><span className="textarea" role="textbox" contentEditable="true" onInput={handleInputChange} ref={textAreaRef} suppressContentEditableWarning={true}>
                {text}</span>
            </p>
            <button onClick={addTask} className='add-task' >Add</button>
        </div>
    );
}

export default TodoList;