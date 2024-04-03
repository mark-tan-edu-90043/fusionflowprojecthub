import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../_utils/firebase";
import { useRouter } from "next/router";
import { v4 } from "uuid";

export default function ClientManagement() {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null); // Initialize selectedProject as null
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState({
        toDo: [],
        inProgress: [],
        done: []
    });

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const selectProject = (projectId) => {
        setSelectedProject(projectId);
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDoc = await getDoc(doc(db, "users", currentUser.uid)); // Assuming user data is stored in "users" collection
                const projectsQuery = query(collection(db, "projects"), where("clients", "array-contains", currentUser.uid)); //Grab all projects where the Developer is involved
                const projectsSnapshot = await getDocs(projectsQuery);
                const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjects(projectsData);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            fetchTasks(selectedProject); // Fetch tasks only when selectedProject changes
            console.log(tasks.inProgress)
        }
    }, [selectedProject]);

    const fetchTasks = async (projectId) => {
        try {
            console.log(projectId)
            const tasksQuery = query(collection(db, "projects", projectId, "tasks"));
            const tasksSnapshot = await getDocs(tasksQuery);
            
            // Initialize arrays for each status
            let inProgressTasks = [];
            let doneTasks = [];

            console.log(tasksQuery);
            console.log(tasksSnapshot);
    
            tasksSnapshot.forEach(taskDoc => {
                console.log(taskDoc.id);
                const taskData = taskDoc.data();
                const task = { id: taskDoc.id, ...taskData };
    
                // Assign tasks to respective arrays based on status
                switch (task.status) {
                    case 'todo':
                        inProgressTasks.push(task);
                        break;
                    case 'inProgress':
                        inProgressTasks.push(task);
                        break;
                    case 'done':
                        doneTasks.push(task);
                        break;
                    default:
                        console.warn(`Task with unknown status: ${task.status}`);
                }
            });
    
            // Set tasks state
            setTasks({
                inProgress: inProgressTasks,
                done: doneTasks
            });
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };                   

    return (
        <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ width: '90%', fontSize: '30px', fontWeight: '700', color: '#fff', textAlign: 'end' }}>Client View</div>
            <div style={{
                display: 'flex',
                width: '90%',
                height: '80%',
                borderRadius: '10px',
                backgroundColor: '#fff'
            }}>
                <div style={{ width: '100%' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}>
                        <button style={{
                            width: '66px',
                            height: '32px',
                            background: 'linear-gradient(to bottom, #fc6c45, #ffc6b7)',
                            color: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0px 3px 2px #dc4c25',
                            marginTop: '10px',
                            marginRight: '10px'
                        }}>Close</button>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',

                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '25px'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "space-between",
                                width: '250px',
                                height: '480px',
                                padding: '0 10px',
                                backgroundColor: '#6B9EFF',
                                borderRadius: '10px',
                                marginRight: '15px'
                            }}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '10px',
                                        fontSize: '13px',
                                    }}>
                                        <span style={{ fontWeight: 700 }}>Project</span>
                                    </div>
                                    <div>
                                        {projects.map(project => (
                                            <div key={project.id} onClick={() => selectProject(project.id)} style={{
                                                backgroundColor: selectedProject === project.id ? '#ccc' : '#fff',
                                                borderRadius: '10px',
                                                padding: '10px',
                                                fontSize: '13px',
                                                lineHeight: '20px',
                                                marginTop: '20px',
                                                color: selectedProject === project.id ? '#000' : '#ccc',
                                                cursor: 'pointer'
                                            }}>
                                                {project.name}
                                                {showPopup && (
                                                    <div className="popup">
                                                        <div className="popup-content">
                                                            <h2>Company Name: {project.companyName}</h2>
                                                            <h2>Address: {project.address}</h2>
                                                            <h2>Contact Person: {project.contactPerson}</h2>
                                                            <h2>Number: {project.number}</h2>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Render tasks based on selected project */}
                            {selectedProject && (
                                <>
                                    {/* Render inProgress tasks */}
                                    <div style={{
                                        width: '250px',
                                        height: '480px',
                                        padding: '0 10px',
                                        backgroundColor: '#49d290',
                                        borderRadius: '10px',
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '10px',
                                            fontSize: '13px'
                                        }}>
                                            <span style={{ fontWeight: 700 }}>In progress Task</span>
                                        </div>
                                        {tasks.inProgress.map((task) => (
                                            <div key={task.id} style={{
                                                backgroundColor: '#fff',
                                                borderRadius: '10px',
                                                padding: '10px',
                                                fontSize: '13px',
                                                lineHeight: '20px',
                                                marginTop: '20px',
                                                color: '#ccc'
                                            }}>
                                                {task.name} {/* Assuming you have a taskName field in your task document */}
                                            </div>
                                        ))}
                                    </div>
                                    {/* Render done tasks */}
                                    <div style={{
                                        width: '250px',
                                        height: '480px',
                                        margin: '0 15px',
                                        padding: '0 10px',
                                        backgroundColor: '#adc9fd',
                                        borderRadius: '10px',
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '10px',
                                            fontSize: '13px'
                                        }}>
                                            <span style={{ fontWeight: 700 }}>Completed Task</span>
                                        </div>
                                        {tasks.done.map((task) => (
                                            <div key={task.id} style={{
                                                backgroundColor: '#fff',
                                                borderRadius: '10px',
                                                padding: '10px',
                                                fontSize: '13px',
                                                lineHeight: '20px',
                                                marginTop: '20px',
                                                color: '#ccc'
                                            }}>
                                                {task.taskName} {/* Assuming you have a taskName field in your task document */}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
