// Calendar.jsx

import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [assignments, setAssignments] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const storedAssignments = localStorage.getItem('assignments');
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  const handleAddAssignment = () => {
    if (!deadline || !description) return;
    setAssignments([...assignments, { deadline, description }]);
    setDeadline('');
    setDescription('');
  };

  const handleDeleteAssignment = (index) => {
    const updatedAssignments = [...assignments];
    updatedAssignments.splice(index, 1);
    setAssignments(updatedAssignments);
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <div className="calendar">
        {/* Calendar UI goes here */}
      </div>
      <div className="assignment-form">
        <h3>Add Assignment</h3>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddAssignment}>Add</button>
      </div>
      <div className="assignments">
        <h3>Assignments</h3>
        <ul>
          {assignments.map((assignment, index) => (
            <li key={index}>
              <strong>{assignment.deadline}</strong> - {assignment.description}
              <button onClick={() => handleDeleteAssignment(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
