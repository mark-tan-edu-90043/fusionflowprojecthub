import React, { useState, useEffect } from 'react';
import './calendar.css';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../_utils/firebase";
import { useRouter } from "next/router";

const Calendar = () => {
  const [assignments, setAssignments] = useState([]);
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(null); // Add this line
  const [selectedYear, setSelectedYear] = useState(null); // Add this line
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);
    return () => unsubscribe();
  }, []);

  useEffect(() => { //Debug
    console.log(projects);
  }, [projects]);

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = '#f2f2f2';
    e.currentTarget.style.color = '#000000';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = '#007bff';
    e.currentTarget.style.color = '#fff';
  };

  const handleAuthStateChanged = async (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      const userDoc = await getDoc(doc(db, "users", currentUser.uid)); // Assuming user data is stored in "users" collection
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'Admin') { // Check if user is an admin
          setIsAdmin(true);
        }
      }
      const projectsQuery = query(collection(db, "projects"), where("developers", "array-contains", currentUser.uid));
      const projectsSnapshot = await getDocs(projectsQuery);
      const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    } else {
      setUser(null);
    }
  };

  const getProjectName = (projectId) => {
    const project = projects.find(project => project.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projects || projects.length === 0) return; // Check if projectsData is empty or null
      const tasksPromises = projects.map(async (project) => {
        const tasksQuery = query(collection(db, `projects/${project.id}/tasks`));
        const tasksSnapshot = await getDocs(tasksQuery);
        return tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), projectId: project.id }));
      });
      const allTasks = await Promise.all(tasksPromises);
      const flattenedTasks = allTasks.flat(); // Flatten the array of arrays
      setAssignments(flattenedTasks);
    };
    fetchTasks();
    console.log(assignments);
  }, [projects]);



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

  const colorRender = (status) => {
    switch (status) {
      case 'todo':
        return '2px solid #49d290';
      case 'inProgress':
        return '2px solid blue';
      case 'done':
        return '2px solid #EB785A';
      default:
        return '2px solid white'; //Just in case no task
    }
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
          style={{ color: 'black' }}
        >
          <span>{day}</span>
          <ul>
            {assignments.map(
              (assignment, index) =>
                assignment.deadline === cellDate && (
                  <li key={index} style={{ border: colorRender(assignment.status), padding: '5px', marginBottom: '5px' }}>
                    {assignment.name}
                    <br></br>
                    <span style={{ fontSize: '12px', color: 'gray' }}> {getProjectName(assignment.projectId)}</span>
                    {/* <button onClick={() => handleDeleteAssignment(cellDate, index)}>Delete</button> */}
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
    <main className="h-screen" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', backgroundColor: '#D2DCF0' }} >
      <div style={{ width: '100%', background: 'white', paddingTop: '5px', paddingBottom: '5px', display: 'flex', justifyContent: 'center' }}>
        <img src="/LOG 1.svg" alt="Logo" width={170} height={80}></img>
        <div style={{ width: '78%', }}>
          <nav style={{ background: 'white', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
            <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'flex-end', alignContent: 'center', }}>
              <li onClick={() => { router.push('../Profile') }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>My Profile</li>
              <li onClick={() => router.push('/calendar')}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Calendar</li>
              <li onClick={() => router.push('/Developer/Home')}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Developer Dashboard</li>
              {isAdmin &&
                <li onClick={() => router.push('/Admin/Home')}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Admin Panel</li>
              }
              <li onClick={() => auth.signOut().then(() => { router.push('../AdminLogin') })}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', }}>Log Out</li>
            </ul>
          </nav>
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: '40px', fontWeight: 'bold', color: '#fff', alignItems: 'center', justifyContent: 'flex-end', width: '90%', }}>Calendar</div>
      <div style={{
        height: '100%',
        width: '90%',
        marginBottom: '30px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        overflowY: 'auto'
      }}>
        <div className="calendar-container">

          <div className="month-year-selector" style={{ marginBottom: '8px', color: 'black' }}>
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
              style={{ marginLeft: '10px' }}
            >
              <option value="">Select Year</option>
              {[...Array(10).keys()].map((year) => (
                <option key={year} value={new Date().getFullYear() + year}>
                  {new Date().getFullYear() + year}
                </option>
              ))}
            </select>
          </div>
          <div className="calendar" >
            {renderCalendar()}
          </div>
          {/*<div className="assignment-form">
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
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default Calendar;

