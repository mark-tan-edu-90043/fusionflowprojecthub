import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, collectionGroup, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../_utils/firebase";
import { useRouter } from "next/router";
import Image from 'next/image';
import Task from '../components/task';
import AddTask from '../components/addTask';
import FileList from '../components/fileList';
import FileUpload from '../components/fileUpload';

export default function ProjectDash() {
    const router = useRouter();
    const [projectName, setProjectName] = useState('');
    const [tasks, setTasks] = useState({
        toDo: [],
        inProgress: [],
        done: []
    });
    const projectId = router.query.projectId;
    const [showPopup, setShowPopup] = useState(false);
    const [developers, setDevelopers] = useState([])

    const fetchProjectName = async () => {
        try {
            const projectDoc = await getDoc(doc(db, "projects", projectId));
            if (projectDoc.exists()) {
                setProjectName(projectDoc.data().name);
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error getting document:", error);
        }
    };

    const fetchTasks = async () => {
        try {
            const tasksQuery = query(collection(db, "projects", projectId, "tasks"));
            const tasksSnapshot = await getDocs(tasksQuery);
            
            // Initialize arrays for each status
            let todoTasks = [];
            let inProgressTasks = [];
            let doneTasks = [];
    
            tasksSnapshot.forEach(taskDoc => {
                const taskData = taskDoc.data();
                const task = { id: taskDoc.id, ...taskData };
    
                // Assign tasks to respective arrays based on status
                switch (task.status) {
                    case 'todo':
                        todoTasks.push(task);
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
                toDo: todoTasks,
                inProgress: inProgressTasks,
                done: doneTasks
            });
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };                   

    const fetchDevs = async() => {
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
            developers.push(userData);
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

    useEffect(() => {
        console.log('fetching everything...')
        if (projectId) {
            fetchProjectName();
            fetchTasks();
            fetchDevs();
        }
    }, [projectId]);

    useEffect(() => {
        console.log('fetching tasks...')
        if (projectId) {
            fetchTasks();
        }
    }, [projectId]);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleDelete = async (taskId) => {
        try {
            const taskRef = doc(db, "projects", projectId, "tasks", taskId);
            await deleteDoc(taskRef);
            // Update the tasks state by filtering out the deleted task from the respective array
            setTasks(prevTasks => ({
                ...prevTasks,
                toDo: prevTasks.toDo.filter(task => task.id !== taskId),
                inProgress: prevTasks.inProgress.filter(task => task.id !== taskId),
                done: prevTasks.done.filter(task => task.id !== taskId)
            }));
            console.log("Task deleted successfully!");
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    

        return (
            <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#D2DCF0'  }}>
                
                <div style={{ width: '90%', fontSize: '30px', fontWeight: '700', color: '#fff', textAlign: 'end' }}>{projectName}</div>
                <div style={{
                     display: 'flex',
                     width: '90%',
                     height: '90%',
                     borderRadius: '10px',
                     backgroundColor: '#fff',
                     alignContent:'center'
                }}>       
                    <div style={{ width:' 100%' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems:'center',
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
                            }} onClick={() => router.push('/Developer/Home')}> Close </button>
                        </div>
                                
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                            <div style={{
                                // display: 'flex',
                                // flexDirection: 'column',
                                // justifyContent: "space-between",
                                // alignItems: 'center',
                                // width: '250px',
                                // height: '520px',
                                // padding: '0 10px',
                                // borderRight: '2px solid #ccc',
                            }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "space-between",
                                // marginLeft: '20px',
                                width: '250px',
                                height: '520px',
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
                                        <span style={{ fontWeight: 700 }}>To do</span>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            backgroundColor: 'red',
                                            borderRadius: '50%',
                                            lineHeight: '20px',
                                            textAlign: 'center',
                                            color: '#fff'
                                        }}>{tasks.done.length}</div>
                                    </div>
                                    {tasks.toDo.map(task => (
                                        <Task key={task.id} task={task} onDelete={handleDelete} />
                                    ))}
                                </div>
                                <div style={{
                                    marginBottom: '20px',
                                    padding: '8px',
                                    border: '1px dotted #000',
                                    fontSize: '13px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                }}>
                                    <button onClick={handleOpenPopup}>Add new task</button>
                                </div>
                                </div>
                            </div>

                                {/* <div style={{
                                    display: 'flex',
                                    justifyContent: "space-between",
                                    alignItems: 'center',
                                    width: '100%',
                                    padding: '8px 8px 0 8px',
                                    fontSize: '13px',
                                    color: '#fff'
                                }}>
                               
                                </div> */}
                                <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "space-between",
                                // marginLeft: '20px',
                                width: '250px',
                                height: '520px',
                                padding: '0 10px',
                                backgroundColor: '#49d290',
                                borderRadius: '10px',
                                marginRight:'15px'
                            }}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '10px',
                                        fontSize: '13px'
                                    }}>
                                        <span style={{ fontWeight: 700 }}>In progress Task</span>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            backgroundColor: 'red',
                                            borderRadius: '50%',
                                            lineHeight: '20px',
                                            textAlign: 'center',
                                            color: '#fff'
                                        }}>{tasks.inProgress.length}</div>
                                    </div>
                                    {tasks.inProgress.map(task => (
                                        <Task key={task.id} task={task} onDelete={handleDelete} />
                                    ))}
                                </div>
                                <div style={{
                                    marginBottom: '20px',
                                    padding: '8px',
                                    border: '1px dotted #000',
                                    fontSize: '13px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                }}>
                                    + <span>Add new task</span>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "space-between",
                                width: '250px',
                                height: '520px',
                                // margin: '0 15px',
                                padding: '0 10px',
                                backgroundColor: '#adc9fd',
                                borderRadius: '10px',
                                marginRight:'15px'
                            }}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '10px',
                                        fontSize: '13px'
                                    }}>
                                        <span style={{ fontWeight: 700 }}>Completed Task</span>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            backgroundColor: 'red',
                                            borderRadius: '50%',
                                            lineHeight: '20px',
                                            textAlign: 'center',
                                            color: '#fff'
                                        }}>{tasks.done.length}</div>
                                    </div>
                                    {tasks.done.map(task => (
                                        <Task key={task.id} task={task} onDelete={handleDelete} />
                                    ))}
                                </div>
                                <div style={{
                                    marginBottom: '20px',
                                    padding: '8px',
                                    border: '1px dotted #000',
                                    fontSize: '13px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                }}>
                                    + <span>Add new task</span>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "space-between",
                                width: '250px',
                                height: '520px',
                                padding: '0 10px',
                                backgroundColor: '#ffc2af',
                                borderRadius: '10px',
                                marginRight:'15px',
                                // marginLeft:'10px'
                            }}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '10px',
                                        fontSize: '13px'
                                    }}>
                                        <span style={{ fontWeight: 700 }}>Participating Staff</span>
                                    </div>
                                    {developers.map(developer  => (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: "space-between",
                                            backgroundColor: '#fff',
                                            borderRadius: '18px',
                                            padding: '10px',
                                            fontSize: '13px',
                                            lineHeight: '20px',
                                            marginTop: '20px',
                                            color: '#ccc'
                                        }}>
                                            <div style={{ display: 'flex' }}>
                                                {developer.photoURL ?   (
                                                    <Image width={20} height={20} src={developer.photoURL}/>
                                                ) : (
                                                    <Image width={20} height={20} src='/Group 6.svg' />
                                                )}

                                                <span style={{ marginLeft: '6px' }}>{developer.name}</span>
                                            </div>
                                            <span>{developer.role}</span>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>         
                        
                        <FileUpload projectId={projectId} />   
                                                    <br />
                        <FileList projectId={projectId} />
                        </div>       
                    
                    </div>      

                    {showPopup && (
                        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
                    <AddTask handleClose={handleClosePopup} projectId={projectId} />
                </div>
            )}          
            </main>
        );
    }