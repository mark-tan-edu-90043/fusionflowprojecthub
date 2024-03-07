    import Image from "next/image";
    import React, {useState, useEffect} from 'react';
    import { collection, query, where, getDocs, doc, collectionGroup, getDoc, addDoc} from "firebase/firestore";
    import { auth, db } from "../../_utils/firebase";
    import { useRouter } from "next/router";

    export default function ProjectDash() {
        const router = useRouter();
        const [projectName, setProjectName] = useState('');
        const [tasks, setTasks] = useState([]);
        const projectId = router.query.projectId; 
        const [showPopup, setShowPopup] = useState(false);
        const [taskName, setTaskName] = useState('');
        const [taskDescription, setTaskDescription] = useState('');

            useEffect(() => {
                if (projectId) {
                    // Fetch project name from the database using the project ID
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
                                // Fetch tasks associated with the project from the subcollection
                const fetchTasks = async () => {
                    try {
                        const tasksQuery = query(collection(db, "projects", projectId, "tasks"));
                        const tasksSnapshot = await getDocs(tasksQuery);
                        const tasksData = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setTasks(tasksData);
                    } catch (error) {
                        console.error("Error fetching tasks:", error);
                    }
                };

                fetchProjectName();
                fetchTasks();
                console.log(projectName);
                }
            }, [projectId]); //IT works for now. I'll fix it later

        const handleOpenPopup = () => {
            setShowPopup(true);
        };
    
        const handleClosePopup = () => {
            setShowPopup(false);
        };
    
        const handleTaskNameChange = (e) => {
            setTaskName(e.target.value);
        };
    
        const handleTaskDescriptionChange = (e) => {
            setTaskDescription(e.target.value);
        };
    
        const handleSubmitTask = async () => {
            try {
                // Add the new task to the database
                const taskRef = await addDoc(collection(db, "projects", projectId, "tasks"), {
                    name: taskName,
                    description: taskDescription
                });
                console.log("New task added with ID: ", taskRef.id);
                // Clear input fields and close the popup
                setTaskName('');
                setTaskDescription('');
                setShowPopup(false);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        };
    

        return (
            <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                <div style={{ width: '90%', fontSize: '30px', fontWeight: '700', color: '#fff', textAlign: 'end' }}>{projectName}</div>
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
                            }} onClick={() => router.push('/Developer/Home')}> Close </button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px', flexDirection: 'row' }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "space-between",
                                alignItems: 'center',
                                width: '250px',
                                height: '520px',
                                padding: '0 10px',
                                borderRight: '2px solid #ccc',
                            }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "space-between",
                                marginLeft: '20px',
                                width: '250px',
                                height: '520px',
                                padding: '0 10px',
                                backgroundColor: '#6B9EFF',
                                borderRadius: '10px',
                            }}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '10px',
                                        fontSize: '13px'
                                    }}>
                                        <span style={{ fontWeight: 700 }}>To do</span>
                                    </div>
                                    {tasks.map(task => (
                                        <div key={task.id} style={{ 
                                            backgroundColor: '#fff',
                                            borderRadius: '10px',
                                            padding: '10px',
                                            fontSize: '13px',
                                            lineHeight: '20px',
                                            marginTop: '20px',
                                            color: '#ccc'
                                        }}>
                                            {task.name}
                                        </div>
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
                                {showPopup && (
                                    <div className="popup">
                                        <div className="popup-content">
                                            <span className="close" onClick={handleClosePopup}>&times;</span>
                                            <h2>Add New Task</h2>
                                            <input
                                                type="text"
                                                value={taskName}
                                                onChange={handleTaskNameChange}
                                                placeholder="Task Name"
                                            />
                                            <textarea
                                                value={taskDescription}
                                                onChange={handleTaskDescriptionChange}
                                                placeholder="Task Description"
                                            />
                                            <button onClick={handleSubmitTask}>Submit</button>
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: "space-between",
                                    alignItems: 'center',
                                    width: '100%',
                                    padding: '8px 8px 0 8px',
                                    fontSize: '13px',
                                    color: '#fff'
                                }}>
                                    
                                        
                                
                                </div>
                            </div>
                            
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "space-between",
                                marginLeft: '20px',
                                width: '250px',
                                height: '520px',
                                padding: '0 10px',
                                backgroundColor: '#49d290',
                                borderRadius: '10px',
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
                                        }}>2</div>
                                    </div>
                                    <div style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        fontSize: '13px',
                                        lineHeight: '20px',
                                        marginTop: '20px',
                                        color: '#ccc'
                                    }}>
                                        Database
                                    </div>
                                    <div style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        fontSize: '13px',
                                        lineHeight: '20px',
                                        marginTop: '20px',
                                        color: '#ccc'
                                    }}>
                                        placehold
                                    </div>
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
                                margin: '0 15px',
                                padding: '0 10px',
                                backgroundColor: '#adc9fd',
                                borderRadius: '10px',
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
                                        }}>1</div>
                                    </div>
                                    <div style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        fontSize: '13px',
                                        lineHeight: '20px',
                                        marginTop: '20px',
                                        color: '#ccc'
                                    }}>
                                        Ul design
                                    </div>
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
                            }}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '10px',
                                        fontSize: '13px'
                                    }}>
                                        <span style={{ fontWeight: 700 }}>Participating Staff</span>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            backgroundColor: 'red',
                                            borderRadius: '50%',
                                            lineHeight: '20px',
                                            textAlign: 'center',
                                            color: '#fff'
                                        }}>1</div>
                                    </div>
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
                                            <Image width={20} height={20} src='/Group 6.svg' />
                                            <span style={{ marginLeft: '6px' }}>Cheelix zhang</span>
                                        </div>
                                        <span>Design</span>
                                    </div>
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
                                            <Image width={20} height={20} src='/Group 6.svg' />
                                            <span style={{ marginLeft: '6px' }}>Mick Tang
                                            </span>
                                        </div>
                                        <span>Testing</span>
                                    </div>
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
                                            <Image width={20} height={20} src='/Group 6.svg' />
                                            <span style={{ marginLeft: '6px' }}>Marry Lee</span>
                                        </div>
                                        <span>Code</span>
                                    </div>
                                </div>
                                {/* <div style={{
                                    marginBottom: '20px',
                                    padding: '8px',
                                    border: '1px dotted #000',
                                    fontSize: '13px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                }}>
                                    
                                </div> */}
                            </div>
                        </div>
                    </div>
            </main>
        );
    }
