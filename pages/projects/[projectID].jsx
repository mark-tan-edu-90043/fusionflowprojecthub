import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../_utils/firebase";
import { useRouter } from "next/router";
import Image from 'next/image';
import Task from '../components/task';
import AddTask from '../components/addTask';
import FileList from '../components/fileList';
import EditProject from '../components/EditProject';
import { v4 } from 'uuid';


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
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [project, setProject] = useState(null);
    const [user, setUser] = useState('');
    const [isAdmin, setIsAdmin] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDoc = await getDoc(doc(db, "users", currentUser.uid)); // Assuming user data is stored in "users" collection
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.role === 'Admin') { // Check if user is an admin
                        setIsAdmin(true);
                    }
                }
            }
        });
        return () => unsubscribe();
    }, []);

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

    const fetchProjectDetails = async () => {
        try {
            const projectDoc = await getDoc(doc(db, "projects", projectId));
            if (projectDoc.exists()) {
                setProject(projectDoc.data());
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
                console.log(task.id);

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

    const fetchDevs = async () => {
        try {
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
            fetchProjectDetails();
        }
    }, [projectId]);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleEdit = () => {
        setShowEdit(true);
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
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
            router.reload();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleChangeStatus = async (taskId, status) => {
        try {
            const taskRef = doc(db, "projects", projectId, "tasks", taskId);
            await updateDoc(taskRef, {
                status: status
            })
            console.log('Sucessfully edited task');
            router.reload();
        } catch (error) {
            console.error("Failed to update:", error)
        }
    }


    return (
        <main style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#D2DCF0' }}>

            <div style={{ width: '90%', fontSize: '30px', fontWeight: '700', color: '#fff', textAlign: 'end' }}>{projectName}</div>
            <div style={{
                display: 'flex',
                width: '90%',
                height: '100%',
                borderRadius: '10px',
                backgroundColor: '#fff',
                alignContent: 'center'
            }}>

                <div style={{ width: ' 100%' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        {isAdmin &&
                            <button style={{
                                width: '70px',
                                height: '30px',
                                background: 'linear-gradient(to bottom, #6b9eff,#ACC8FD )',
                                color: '#fff',
                                borderRadius: '5px',
                                boxShadow: '0px 3px 2px #0057FF',
                                marginTop: '10px',
                                marginRight: '10px'
                            }} onClick={handleEdit}> Edit </button>
                        }

                        <button style={{
                            width: '70px',
                            height: '30px',
                            background: 'linear-gradient(to bottom, #fc6c45, #ffc6b7)',
                            color: '#fff',
                            borderRadius: '5px',
                            boxShadow: '0px 3px 2px #dc4c25',
                            marginTop: '10px',
                            marginRight: '10px'
                        }} onClick={() => router.push('/Developer/Home')}> Close </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
                                marginRight: '15px',
                                overflowY: 'auto',

                            }}>

                                <div style={{
                                    overflowY: 'auto',   /* Enable vertical scrolling */
                                }}>
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
                                        <Task key={task.id} task={task} onDelete={handleDelete} onEditStatus={handleChangeStatus} />
                                    ))}
                                </div>

                                <div style={{
                                    marginBottom: '10px',
                                    padding: '8px',
                                    border: '1px dotted #000',
                                    fontSize: '13px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                }}>
                                    + <button onClick={handleOpenPopup}>Add new task</button>
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
                            marginRight: '15px',

                        }}>
                            <div style={{
                                overflowY: 'auto',   /* Enable vertical scrolling */
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    fontSize: '13px',

                                }}>
                                    <span style={{ fontWeight: 700 }}>In progress Task</span>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        lineHeight: '20px',
                                        textAlign: 'center',
                                        color: '#fff',

                                    }}>{tasks.inProgress.length}</div>
                                </div>
                                {tasks.inProgress.map(task => (
                                    <Task key={task.id} task={task} onDelete={handleDelete} onEditStatus={handleChangeStatus} />
                                ))}
                            </div>
                            <div style={{
                                marginBottom: '10px',
                                padding: '8px',
                                border: '1px dotted #000',
                                fontSize: '13px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)'
                            }}>
                                + <button onClick={handleOpenPopup}>Add new task</button>
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
                            marginRight: '15px',
                            overflowY: 'auto',
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
                                    <Task key={task.id} task={task} onDelete={handleDelete} onEditStatus={handleChangeStatus} />
                                ))}
                            </div>
                            <div style={{
                                marginBottom: '10px',
                                padding: '8px',
                                border: '1px dotted #000',
                                fontSize: '13px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)'
                            }}>
                                + <button onClick={handleOpenPopup}>Add new task</button>
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
                            marginRight: '15px',
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
                                {developers.map(developer => (
                                    <div key={v4()} style={{
                                        display: 'flex',
                                        justifyContent: "space-between",
                                        backgroundColor: '#fff',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        fontSize: '13px',
                                        lineHeight: '20px',
                                        marginTop: '20px',
                                        color: '#ccc'
                                    }}>
                                        <div style={{ display: 'flex' }}>
                                            {developer.photoURL ? (
                                                <Image width={20} height={20} src={developer.photoURL} />
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

                    <FileList projectId={projectId} />
                </div>

            </div>

            {showPopup && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
                    <AddTask handleClose={handleClosePopup} projectId={projectId} />
                </div>
            )}

            {showEdit && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
                    <EditProject handleClose={handleCloseEdit} project={project} projectId={projectId} />
                </div>
            )}

        </main>
    );
}  