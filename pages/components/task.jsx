import React from 'react';

const Task = ({ task, onDelete }) => {

    if (!task) {
        return null; // or any other appropriate action
    }
    
    const { id, name, description, deadline, status } = task;

    const handleDelete = () => {
        onDelete(id);
    };

    // Calculate the difference in days between the current date and the deadline
    const currentDate = new Date();
    const dueDate = new Date(deadline);
    const differenceInTime = dueDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    // Determine the color based on the difference in days
    let dateColor = 'black';
    if (differenceInDays < 0) {
        dateColor = 'red'; // Due date has passed
    } else if (differenceInDays <= 3) {
        dateColor = 'orange'; // Due date is within 3 days
    }

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
            <span style={{ color: dateColor }}>Due: {deadline}</span>
            <br />
            <button style={{ color: 'red' }} onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default Task;
