import React from 'react';

const Task = ({ task, onDelete }) => {
    const { id, name, description } = task;

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '10px',
            fontSize: '13px',
            lineHeight: '20px',
            marginTop: '20px',
            color: 'black'
        }}>
            {name}
            <br />
            <span style={{ color: 'grey' }}>{description}</span>
            <br />
            <button style={{ color: 'red' }} onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default Task;
