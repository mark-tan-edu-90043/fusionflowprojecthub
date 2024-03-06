import React, { useState } from 'react';

export default function todoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
    setInputValue(event.target.value);
    };

    const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
        setTodos([...todos, inputValue]);
        setInputValue('');
    }
    };

    const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    };

    return (
    <div>
        <h2>Todo List</h2>
        <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new todo..."
        />
        <button onClick={handleAddTodo}>Add Todo</button>
        <ul>
        {todos.map((todo, index) => (
            <li key={index}>
            {todo}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            </li>
        ))}
        </ul>
    </div>
    );
}