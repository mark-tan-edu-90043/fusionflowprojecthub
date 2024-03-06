import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../../_utils/firebase";
import { useRouter } from "next/router";

// Defining a functional component named Admin
export default function Admin() {
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    // Fetch user data from Firestore
    const getUsersData = async () => {
        try {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const usersData = usersSnapshot.docs.map(doc => {
                const userData = doc.data();    
                userData.uid = doc.id; // Set the user ID from the document ID
                return userData;
            });
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    

    // Function to handle user click
    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    // Function to handle save button click
    const handleSave = async () => {
        try {
            if (!selectedUser || !selectedUser.uid) {
                console.error("Error: Selected user or user ID is undefined.");
                return;
            }
    
            // Update the user's role in the database
            const userRef = doc(db, "users", selectedUser.uid);
            await updateDoc(userRef, {
                role: selectedUser.role
            });
            console.log("Role updated successfully:", selectedUser);
            setEditMode(false); // Turn off edit mode after saving changes
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };
    

    // Function to handle delete button click
    const handleDelete = () => {
        // Delete the user from the database
        // This is where you would implement the logic to delete the user from Firestore
        // You need to use the selectedUser state to access the data of the user being deleted
        console.log("User deleted:", selectedUser);
        // Implement deletion logic here...
        setSelectedUser(null); // Clear selectedUser state after deletion
    };

    // Function to handle position change
    const handlePositionChange = (e) => {
        // Update the position of the selected user
        setSelectedUser({ ...selectedUser, role: e.target.value });
    };


    useEffect(() => {
        getUsersData();
    }, []);

    return (
        <main style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            <nav style={{ backgroundColor: '#6B9EFF', width: '100%', padding: '20px 0', textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>
                <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}>
                    <li onClick={() => { router.push('../Profile') }} style={{ padding: 20, cursor: 'pointer' }}>My Profile</li>
                    <li onClick={() => auth.signOut().then(() => { router.push('../AdminLogin') })} style={{ padding: 20, cursor: 'pointer' }}>Log Out</li>
                    <li onClick={() => router.push('/Developer/Home')} style={{ padding: 20, cursor: 'pointer' }}>Developer Dashboard</li>
                    <li style={{ padding: 20, fontWeight: "bold", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>Admin Panel</li>
                </ul>
            </nav>


            <div style={{ width: '90%', fontSize: '30px', fontWeight: '700', color: '#fff', textAlign: 'end' }}>Admin</div>
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
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
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
                                fontSize: '13px',
                                color: '#ccc',
                                marginTop: '10px',
                                marginBottom: '10px'
                            }}>
                                {selectedUser && (
                                    <>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: '8px',
                                            marginBottom: '20px',
                                            width: '120px',
                                            height: '120px',
                                            borderRadius: '50%',
                                        }}>
                                            <Image width={100} height={100} src='/Group 6.svg'></Image>
                                        </div>
                                        <div style={{ paddingTop: '5px' }}><span style={{ fontWeight: 700 }}>StaffiD:</span> {selectedUser.uid}</div>
                                        <div style={{ paddingTop: '5px' }}><span style={{ fontWeight: 700 }}>Name:</span> {selectedUser.name}</div>
                                        <div style={{ paddingTop: '5px' }}><span style={{ fontWeight: 700 }}>Username:</span> {selectedUser.username}</div>
                                        <div style={{ paddingTop: '5px' }}><span style={{ fontWeight: 700 }}>DOB:</span> {selectedUser.dob}</div>
                                        <div style={{ paddingTop: '5px' }}>
                                            <span style={{ fontWeight: 700 }}>
                                                Role:
                                            </span>
                                            {editMode ? (
                                                <div>
                                                    <label>
                                                        <input type="radio" value="Client" checked={selectedUser && selectedUser.role === "Client"} onChange={handlePositionChange} />
                                                        Client
                                                    </label>
                                                    <label>
                                                        <input type="radio" value="Developer" checked={selectedUser && selectedUser.role === "Developer"} onChange={handlePositionChange} />
                                                        Developer
                                                    </label>
                                                    <label>
                                                        <input type="radio" value="Admin" checked={selectedUser && selectedUser.role === "Admin"} onChange={handlePositionChange} />
                                                        Admin
                                                    </label>
                                                </div>
                                            ) : (
                                                <div>{selectedUser.role}</div>
                                            )}
                                        </div>
                                        <div style={{ paddingTop: '5px' }}><span style={{ fontWeight: 700 }}>Status:</span> {selectedUser.status}</div>
                                        <div style={{ paddingTop: '5px' }}><span style={{ fontWeight: 700 }}>Projects:</span>  {selectedUser.projects}</div>
                                        <div style={{ paddingTop: '5px' }}><span style={{ fontWeight: 700 }}>Current pro:</span> {selectedUser.currentProjects}</div>

                                    </>
                                )}
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
                                {selectedUser && (
                                    <>
                                    { editMode ? 
                                    <button style={{
                                        display: 'flex',
                                        padding: '2px 20px',
                                        backgroundColor: '#6b9eff',
                                        borderRadius: '12px'
                                    }} onClick={handleSave}>
                                        <Image style={{
                                            marginRight: '5px'
                                        }} src='./Group 15.svg' width={15} height={15}></Image>
                                        Save
                                    </button>
                                    :
                                    <button style={{
                                        display: 'flex',
                                        padding: '2px 20px',
                                        backgroundColor: '#6b9eff',
                                        borderRadius: '12px'
                                    }} onClick={toggleEditMode}>
                                        <Image style={{
                                            marginRight: '5px'
                                        }} src='./Group 15.svg' width={15} height={15}></Image>
                                        Edit
                                    </button>
                                    }
                                    <div style={{
                                        display: 'flex',
                                        padding: '2px 20px',
                                        backgroundColor: '#e66098',
                                        borderRadius: '12px'
                                    }}>
                                        <Image style={{
                                            marginRight: '5px'
                                        }} src='./Group 15.svg' width={15} height={15}></Image>
                                        Resigned</div>
                                    </>
                                )}
                            </div>
                        </div>
                        {/*Green Div stuff */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "space-between",
                            marginLeft: '20px',
                            width: '70%',
                            height: '40%',
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
                                    <span style={{ fontWeight: 700 }}>Employee Manager</span>
                                </div>
                                {users.map((user, index) => (
                                    <div key={index} style={{ padding: '20px', borderBottom: '1px solid #fff', cursor: 'pointer' }} onClick={() => handleUserClick(user)}>
                                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>User {index + 1}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: '#fff' }}>
                                            <div style={{ marginRight: '20px' }}>
                                                <div>Email: {user.email}</div>
                                                <div>Username: {user.username}</div>
                                                <div>Role: {user.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
