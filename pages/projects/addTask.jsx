import { useState, useEffect } from 'react';
import { db } from '../../_utils/firebase'; // Import necessary Firebase Firestore functions
import { collection, doc, addDoc } from 'firebase/firestore';

export default function AddTask({ handleClose, projectId }) {
    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
        deadline: '',
        status: ''
    });

    const handleTaskNameChange = (e) => {
        setTaskData(prevState => ({
            ...prevState,
            name: e.target.value
        }));
    };

    const handleTaskDescriptionChange = (e) => {
        setTaskData(prevState => ({
            ...prevState,
            description: e.target.value
        }));
    };

    const handleDeadlineChange = (e) => {
        setTaskData(prevState => ({
            ...prevState,
            deadline: e.target.value
        }));
    };

    const handleStatusChange = (e) => {
        setTaskData(prevState => ({
            ...prevState,
            status: e.target.value
        }));
    };

    useEffect(() => {
        console.log(taskData);
    }, [taskData]);

    const handleSubmit = async () => {
        try {
            // Add the task data to the Firestore database
            const docRef = await addDoc(collection(db, "projects", projectId, "tasks"), {
                name: taskData.name,
                description: taskData.description,
                deadline: taskData.deadline,
                status: taskData.status
            });
            console.log("Task added with ID: ", docRef.id);
            // Optionally, you can perform additional actions after successfully adding the task
            // For example, you can close the modal/dialog
            handleClose();
        } catch (error) {
            console.error("Error adding task: ", error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between" style={{ backgroundColor: 'rgba(231, 231, 231, 0.7)' }}>
            <div style={{
                padding: '40px',
                width: 517,
                height: 600,
                background: '#FFFFFF',
                borderRadius: 22,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: '1',
                color: 'black'
            }}>
                <div style={{ marginBottom: 30 }}>
                    <label style={{ color: '#A1A1A1', fontSize: 18 }}>Task Name</label>
                    <input type="text" onChange={handleTaskNameChange} value={taskData.name} style={{ width: '100%', borderColor: '#A09595', borderWidth: 1, borderStyle: 'solid', borderRadius: 10, padding: 5 }} />
                </div>

                <div style={{ marginBottom: 30 }}>
                    <label style={{ color: '#A1A1A1', fontSize: 18 }}>Status</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <label><input type="radio" name="status" value="todo" onChange={handleStatusChange} checked={taskData.status === 'todo'} /> To Do</label>
                        <label><input type="radio" name="status" value="inProgress" onChange={handleStatusChange} checked={taskData.status === 'inProgress'} /> In Progress</label>
                        <label><input type="radio" name="status" value="done" onChange={handleStatusChange} checked={taskData.status === 'done'} /> Done</label>
                    </div>
                </div>

                <div style={{ marginBottom: 30 }}>
                    <label style={{ color: '#A1A1A1', fontSize: 18, marginBottom: 5 }}>Deadline</label>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <input type="date" onChange={handleDeadlineChange} value={taskData.deadline} />
                    </div>
                </div>
                <div>
                    <label style={{ color: '#A1A1A1', fontSize: 18 }}>Description</label>
                    <textarea style={{ marginTop: '10px', height: '160px', width: '100%', borderColor: '#A09595', borderWidth: 1, borderStyle: 'solid', borderRadius: 10, padding: 5, marginBottom: 10, resize: 'none' }} onChange={handleTaskDescriptionChange} value={taskData.description} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{ backgroundColor: '#E66098', color: '#FFF', width: '123px', height: '37px', borderRadius: '6px', fontSize: '16px', marginRight: '20px' }} onClick={handleClose}>Cancel</button>
                    <button style={{ backgroundColor: '#0057FF', color: '#FFF', width: '123px', height: '37px', borderRadius: '6px', fontSize: '16px' }} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </main>
    );
}
