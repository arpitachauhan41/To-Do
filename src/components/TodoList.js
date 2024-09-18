import React, { useState, useEffect, useRef } from 'react';
import TodoItem from "./TodoItem";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const textareaRef = useRef(null);

    function addTask() {
        if (text.trim() === '') 
            return;
        const newTask = { id: Date.now(), text, completed: false };
        setTasks([...tasks, newTask]);
        setText('');
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function toggleCompleted(id) {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    }

    function handleInputChange(event) {
        setText(event.target.value);
    }

    function calcHeight(value) {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        // min-height + lines x line-height + padding + border
        let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
        return newHeight;
    }

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            const handleKeyUp = () => {
                textarea.style.height = calcHeight(textarea.value) + "px";
            };
            textarea.addEventListener("keyup", handleKeyUp);
            return () => {
                textarea.removeEventListener("keyup", handleKeyUp);
            };
        }
    }, []);

    return (
        <div className="todo-list">
            {tasks.map(task => (
                <TodoItem key={task.id} task={task} deleteTask={deleteTask} toggleCompleted={toggleCompleted} />
            ))}
            <textarea
                placeholder='Add new task'
                className="textarea"
                value={text}
                onChange={handleInputChange}
                ref={textareaRef}
            />
            <button onClick={addTask} className='add-task'>Add</button>
        </div>
    );
}

export default TodoList;
