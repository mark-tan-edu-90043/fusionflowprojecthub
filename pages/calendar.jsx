import React, { useState, useEffect } from 'react';
import './calendar.css';

const Calendar = () => {
  const [assignments, setAssignments] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(null); // Add this line
  const [selectedYear, setSelectedYear] = useState(null); // Add this line

  useEffect(() => {
    const storedAssignments = localStorage.getItem('assignments');
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    const currentDate = new Date();
    setSelectedMonth(currentDate.getMonth());
    setSelectedYear(currentDate.getFullYear());
  }, []);

  // Rest of your component code...


  const handleAddAssignment = () => {
    if (!deadline || !description || !selectedDate) return;
    const newAssignment = { deadline: selectedDate, description };
    setAssignments([...assignments, newAssignment]);
    setDeadline('');
    setDescription('');
    setSelectedDate('');
  };

  const handleDeleteAssignment = (date, index) => {
    const updatedAssignments = assignments.filter(
      (assignment) =>
        !(assignment.deadline === date && assignment.description === assignments[index].description)
    );
    setAssignments(updatedAssignments);
  };

  const renderCalendar = () => {
    if (selectedMonth === null || selectedYear === null) return []; // Check for null values
  
    const startDate = new Date(selectedYear, selectedMonth, 1);
    const numDaysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  
    const calendarCells = [];
    for (let day = 1; day <= numDaysInMonth; day++) {
      const currentDate = new Date(selectedYear, selectedMonth, day);
      const cellDate = currentDate.toISOString().slice(0, 10);
  
      calendarCells.push(
        <div
          key={cellDate}
          className={`calendar-cell ${selectedDate === cellDate ? 'selected' : ''}`}
          onClick={() => setSelectedDate(cellDate)}
        >
          <span>{day}</span>
          <ul>
            {assignments.map(
              (assignment, index) =>
                assignment.deadline === cellDate && (
                  <li key={index}>
                    {assignment.description}
                    <button onClick={() => handleDeleteAssignment(cellDate, index)}>Delete</button>
                  </li>
                )
            )}
          </ul>
        </div>
      );
    }
  
    return calendarCells;
  };
  
  
  
  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <div className="month-year-selector">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          <option value="">Select Month</option>
          {[...Array(12).keys()].map((month) => (
            <option key={month} value={month}>
              {new Date(2000, month, 1).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          <option value="">Select Year</option>
          {[...Array(10).keys()].map((year) => (
            <option key={year} value={new Date().getFullYear() + year}>
              {new Date().getFullYear() + year}
            </option>
          ))}
        </select>
      </div>
      <div className="calendar">
        {renderCalendar()}
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
    </div>
  );
};

export default Calendar;

