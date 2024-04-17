import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db, signOut } from "../../_utils/firebase";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import Task from "../components/ViewOnlyTask"

export default function ClientManagement() {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null); // Initialize selectedProject as null
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [tasks, setTasks] = useState({
        toDo: [],
        inProgress: [],
        done: []
    });
    const [expandedDeveloper, setExpandedDeveloper] = useState(null);
    const toggleExpansion = (developerId) => {
        setExpandedDeveloper((prevExpanded) =>
          prevExpanded === developerId ? null : developerId
        );
    };

    const selectProject = (projectId) => {
        setSelectedProject(projectId);
        setShowPopup((prevExpanded) =>
        prevExpanded === projectId ? null : projectId
      );
    };

    const handleClose = () => {
        auth.signOut()
            .then(() => {
                router.push('/Login');
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
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
            fetchDevs(selectedProject)
            console.log(developers)
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

            console.log(tasks.done);
            console.log(tasks.inProgress);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const fetchDevs = async(projectId) => {
        try{
            // Query the project document to get the array of developer UserIDs
            const projectDoc = await getDoc(doc(db, "projects", projectId));
            if (projectDoc.exists()) {
                const developerUserIDs = projectDoc.data().developers;

                // Fetch the details of each developer using their UserIDs
                const developers = [];
                for (const userID of developerUserIDs) {
                    const userDoc = await getDoc(doc(db, "users", userID));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        const developerWithID = { id: userID, ...userData };
                        developers.push(developerWithID);
                    } else {
                        console.log(`User with ID ${userID} does not exist.`);
                    }
                }
                setDevelopers(developers);

                console.log("Developers assigned to the project:", developers);
            } else {
                console.log("Project document does not exist.");
            }
        } catch (error) {
            console.error("You suck. This is why: ", error)
        }
    }

    return (
        <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#D2DCF0' }}>
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
                            borderRadius: '5px',
                            boxShadow: '0px 3px 2px #dc4c25',
                            marginTop: '10px',
                            marginRight: '10px'    
                        }} onClick={handleClose}>Close</button>
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
                                        overflowY: 'auto'
                                    }}>
                                        <span style={{ fontWeight: 700 }}>Your Projects</span>
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
                                                cursor: 'pointer',
                                            }}>
                                                <b>{project.name}</b>
                                                {showPopup == project.id && (
                                                    <div className="popup">
                                                        <div className="popup-content">
                                                            <h2><em>{project.description}</em></h2>
                                                            <h2>Company Name: {project.clientCompany}</h2>
                                                            <h2>Progress: {project.progress}%</h2>
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
                                        overflowY: 'auto'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '10px',
                                            fontSize: '13px'
                                        }}>
                                            <span style={{ fontWeight: 700 }}>In Progress Tasks</span>
                                        </div>
                                        {tasks.inProgress.map((task) => (
                                                <Task key={task.id} task={task}/>
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
                                        overflowY: 'auto'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '10px',
                                            fontSize: '13px'
                                        }}>
                                            <span style={{ fontWeight: 700 }}>Completed Tasks</span>
                                        </div>
                                        {tasks.done.map((task) => (
                                            <Task key={task.id} task={task}/>
                                        ))}
                                    </div>
                                </>
                            )}

                            {selectedProject && 
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: "space-between",
                                    width: '250px',
                                    height: '480px',
                                    padding: '0 10px',
                                    backgroundColor: '#ffc2af',
                                    borderRadius: '10px',
                                    marginRight:'15px',
                                    // marginLeft:'10px'
                                }}>
                                    <div style={{
                                        overflowY: 'auto',   /* Enable vertical scrolling */
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '10px',
                                            fontSize: '13px'
                                        }}>
                                            <span style={{ fontWeight: 700 }}>Participating Staff</span>
                                        </div>
                                        {developers.map(developer  => (
                                            <div key={developer.id} style={{
                                                display: 'flex',
                                                justifyContent: "space-between",
                                                backgroundColor: '#fff',
                                                borderRadius: '10px',
                                                padding: '10px',
                                                fontSize: '13px',
                                                lineHeight: '20px',
                                                marginTop: '20px',
                                                color: '#ccc', 
                                                cursor: 'pointer'
                                            }}  onClick={() => toggleExpansion(developer.id)}>
                                                {expandedDeveloper === developer.id ? (
                                                    <span style={{ marginTop: '10px' }}>{developer.email}</span>
                                                ) : (
                                                    <>
                                                    <div style={{ display: 'flex'}}>
                                                        {developer.photoURL ? (
                                                            <Image width={20} height={20} src={developer.photoURL}/>
                                                        ) : (
                                                            <Image width={20} height={20} src='/Group 6.svg' />
                                                        )}
                                                        <span style={{ marginLeft: '6px' }}>{developer.name}</span>
                                                    </div>
                                                    <span>{developer.role}</span>
                                                    </>
                                                )}
                                                {/* Always render role, but conditionally */}
                                            </div>
                                        ))}
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
