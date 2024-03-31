    import Image from "next/image";
    import React from 'react';
    import Link from 'next/link';
    import { useState, useEffect } from "react";
    import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
    import { db } from "../../_utils/firebase";

    export default function StaffInfo({handleClose, user}) {
        const [projects, setProjects] = useState([]);
        const [otherProjects, setOtherProjects] = useState([]);
        const [formData, setFormData] = useState({
            name: user ? user.name || '' : '',
            username: user ? user.username || '' : '',
            dob: user ? user.dob || '' : '',    
            role: user ? user.role || '' : '',
            status: user ? user.status || '' : '',
            currentProjectId: user ? user.currentProjectId || '' : '',
        });


        const [selectedProjectToAdd, setSelectedProjectToAdd] = useState('');
        const [selectedProjectToRemove, setSelectedProjectToRemove] = useState('');

        useEffect(() => {
            // Fetch projects where the developer UID array contains the UID of the selected user
            const fetchProjects = async () => {
                const q = query(collection(db, 'projects'), where('developers', 'array-contains', user.uid));
                const querySnapshot = await getDocs(q);
                const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjects(projectsData);
            };

            const fetchOtherProjects = async () => {
                const projectsQuery = collection(db, 'projects');
                const projectsSnapshot = await getDocs(projectsQuery);
                const allProjects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
                // Filter out the projects where the developer is in
                const projectsNotIn = allProjects.filter(project => !project.developers.includes(user.uid));
                
                setOtherProjects(projectsNotIn);
            };

            if (user) {
                fetchProjects();
                fetchOtherProjects();
            }

        }, [user]);

        useEffect(() => {
            console.log(projects)
            console.log(otherProjects)
        }, [projects, otherProjects]);

        const handleFormSubmit = async (e) => {
            e.preventDefault();
            try {
                // Update user document in Firestore
                const userRef = doc(db, 'users', user.uid);
                await updateDoc(userRef, {
                    name: formData.name,
                    username: formData.username,
                    dob: formData.dob,
                    role: formData.role,
                    status: formData.status,
                });

                const projectRef = doc(db, 'projects', selectedProjectToAdd);
                await updateDoc(projectRef, {
                    developers: arrayUnion(user.uid)
                });
                console.log("Added user to " + selectedProjectToAdd)
                
                handleClose();
            } catch (error) {
                console.error('Error updating user:', error);
                // Handle error, show error message to user
            }
        };

        const handleAddToProject = (projectId) => {
            setSelectedProjectToAdd(projectId);
            console.log("Planning to add user to " + projectId)
        };

        const handleRemoveFromProject = (projectId) => {
            setSelectedProjectToRemove(projectId);
            console.log("Planning to remove user from " + projectId)
        };

        return (
            <main className="flex min-h-screen flex-col items-center justify-between" style={{ 
                backgroundColor: 'rgba(231, 231, 231, 0.7)',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <div style={{
                    alignItems: 'center',
                    padding: '40px',
                    width: 517,
                    height: 720,
                    background: '#FFFFFF',
                    borderRadius: 22,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: '1',
                    color: 'black'
                }}>
                    <div style={{ marginTop: '10px' }}>
                        <Image src="/Group 66.svg" alt="fig" width={124} height={124} />
                    </div>

                    <div style={{ marginTop: '20px', width: '100%' }}>
                    <label style={{ fontSize: '16px', color: '#AFAFAF', textAlign: 'left', marginTop: '10px' }}>Staff ID:</label>
                        <p style={{ width: '100%', height: '30px', borderRadius: '5px', marginTop: '5px' }}>{user.uid}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', gap: '20px' }}>
                            <div style={{ width: '60%' }}>
                                <label style={{ fontSize: '16px', color: '#AFAFAF', textAlign: 'left' }}>Name:</label>
                                <input 
                                    type="text" 
                                    style={{ width: '100%', height: '30px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }} 
                                    value={formData.name} // Pre-fill with user's name
                                    onChange={(e) => setFormData(prevState => ({ ...prevState, name: e.target.value }))} // Update user state
                                />
                            </div>
                            <div style={{ width: '60%' }}>
                                <label style={{ fontSize: '16px', color: '#AFAFAF', textAlign: 'left' }}>Username:</label>
                                <input 
                                    type="text" 
                                    style={{ width: '100%', height: '30px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }} 
                                    value={formData.username} // Pre-fill with user's name
                                    onChange={(e) => setFormData(prevState => ({ ...prevState, name: e.target.value }))} // Update user state
                                />
                            </div>
                            <div style={{ width: '38%' }}>
                                <label style={{ fontSize: '16px', color: '#AFAFAF', textAlign: 'left' }}>DoB:</label>
                                {/* Calendar Input */}
                                <input 
                                    type="date" 
                                    style={{ width: '100%', height: '30px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }} 
                                    value={formData.dob} // Pre-fill with user's date of birth
                                    onChange={(e) => setFormData(prevState => ({ ...prevState, dob: e.target.value }))} // Update user state
                                />
                            </div>
                        </div>
                    
                        <div style={{marginTop: '10px'}}>
                        <label style={{ fontSize: '16px', color: '#AFAFAF', textAlign: 'left', marginTop: '10px' ,}}>Role:</label>
                        </div>
                        {/* Dropdown Menu for Position */}
                        <div style={{ display:'flex',  }}>
                            <select 
                                style={{ width: '100%', height: '30px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
                                value={formData.role} // Pre-select the option based on user's role
                                onChange={(e) => setFormData(prevState => ({ ...prevState, role: e.target.value }))} // Update user state
                            >
                                <option value="Admin">Administrator</option>
                                <option value="Developer">Developer</option>
                                <option value="Client">Client</option>
                            </select>
                        </div>


                        <div style={{ marginTop: '10px' }}>
                            <label style={{ fontSize: '16px', color: '#AFAFAF', textAlign: 'left' }}>Status:</label>
                            {/* Dropdown Menu for Status */}
                            <select 
                                style={{ width: '100%', height: '30px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
                                value={formData.status} // Pre-select the option based on user's status
                                onChange={(e) => setFormData(prevState => ({ ...prevState, status: e.target.value }))} // Update user state
                            >
                                <option value="Active">Active</option>
                                <option value="Resigned">Resigned</option>
                                <option value="Probationary">Probationary</option>
                            </select>
                        </div>

                        <div style={{ marginTop: '10px', height: '100px', overflowY: 'auto' }}>
                            <label style={{ fontSize: '16px', color: '#AFAFAF', textAlign: 'left' }}>Current Projects:</label>
                            <div>
                                {projects.map(project => (
                                    <div key={project.id} style={{ marginBottom: '5px', color: selectedProjectToRemove === project.id ? 'red' : (selectedProjectToAdd === project.id ? 'green' : 'black') }} onClick={(e) => handleRemoveFromProject(e.target.value)}>{project.name}</div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: '10px' }}>
                            <label style={{ fontSize: '16px', color: '#AFAFAF', textAlign: 'left', marginTop: '10px' }}>Add to project...:</label>
                            {/* Dropdown Menu for Adding to Projects */}
                            <select
                                style={{ width: '100%', height: '30px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' }}
                                onChange={(e) => handleAddToProject(e.target.value)} // Handle selection
                            >
                                <option value="">Select Project</option>
                                {otherProjects.map(project => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', width: '100%' }}>
                        <button style={{color:'#929292', marginRight: '10px', backgroundColor: '#E3E3E3', borderRadius: '5px', padding: '5px 15px', border: 'none' }} onClick={handleClose}>Cancel</button>
                        <button style={{color:'white' ,backgroundColor: '#3C89FC', borderRadius: '5px', padding: '5px 15px', border: 'none' }} onClick={handleFormSubmit}>Submit</button>
                    </div>
                </div>
            </main>
        );
    }
