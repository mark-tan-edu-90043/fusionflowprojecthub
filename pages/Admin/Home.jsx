import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, getFirestore } from "firebase/firestore";
import { db } from "../../_utils/firebase";
import { useRouter } from "next/router";
import StaffInfo from "../components/StaffInfo";

export default function Admin() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const getUsersData = async () => {
        try {
            const usersCollection = collection(db, 'users');
            let q = usersCollection;
            if (searchQuery) {
                q = query(usersCollection, where('name', '>=', searchQuery));
            }
            const usersSnapshot = await getDocs(q);
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

    const handleUserInfo = (user) => {
        setSelectedUser(user); // Set the selected user
        console.log(selectedUser);
        setShowModal(true); // Show the modal
      };
    
      const handleCloseModal = () => {
        setShowModal(false); // Hide the modal
      };

    useEffect(() => {
        getUsersData();
    }, [searchQuery]);

    useEffect(() => {
        console.log(selectedUser); // Log selectedUser here to see its updated value
    }, [selectedUser]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    return (
        <main className="h-screen" style={{ backgroundColor: '#D2DCF0' }}>
            <nav style={{ width: '100%', height: 50, background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <ul style={{ listStyleType: 'none', color: 'black', margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}>
                    <li onClick={() => { router.push('../Profile') }} style={{ padding: 20, cursor: 'pointer' }}>My Profile</li>
                    <li onClick={() => auth.signOut().then(() => { router.push('../AdminLogin') })} style={{ padding: 20, cursor: 'pointer' }}>Log Out</li>
                    <li onClick={() => router.push('/Developer/Home')} style={{ padding: 20, cursor: 'pointer' }}>Developer Dashboard</li>
                    <li style={{ padding: 20, fontWeight: "bold", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>Admin Panel</li>
                    <li onClick={() => auth.signOut().then(() => { router.push('../AdminLogin') })} style={{ padding: 20, cursor: 'pointer', fontWeight: "bold" }}>Log Out</li>
                </ul>
            </nav>

            <p style={{ marginTop: '20px', marginLeft: '30px' }}>
                Home - Admin
            </p>
            <p style={{ fontSize: '40px', color: 'white', backgroundColor: '#D2DCF0', textAlign: 'right', marginRight: '30px', fontWeight: 'bold' }}>
                Staff Management
            </p>

            <div style={{ marginTop: '20px', marginLeft: '30px', marginRight: '30px', marginBottom: '60px', backgroundColor: 'white', borderRadius: '30px', boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0057FF', borderRadius: '30px', paddingLeft: '10px', paddingRight: '10px', marginBottom: '10px' }}>
                        <p style={{ color: 'white', margin: '0' }}>Search Staff</p>
                        <div style={{ width: 343, height: 34, backgroundColor: '#fff', borderRadius: '30px', display: 'flex', alignItems: 'center' }}>
                            <input type="text" style={{ color: 'black', width: 280, height: '50%', outline: 'none', border: 'none' }} value={searchQuery} onChange={handleSearch} />
                            <Image style={{ marginLeft: '15px' }} src="/Group 42.svg" alt="logo" width={24} height={24} />
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#E3E3E3', borderRadius: '10px', display: 'flex', paddingLeft: '10px', alignItems: 'center', marginBottom: '10px' }}>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '1' }}>ID</p>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '1' }}>Name</p>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '1' }}>Username</p>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '1' }}>BOD</p>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '1' }}>Status</p>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '1' }}>Position</p>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '1' }}>Control</p>
                    </div>
                </div>
                {users.map((user, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', backgroundColor: index % 2 === 0 ? '#fff' : '#F1F1F1', borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <p style={{ color: '#858585', margin: '0', flex: '1', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.uid}</p>
                        <p style={{ color: '#858585', margin: '0', flex: '1' }}>{user.name}</p>
                        <p style={{ color: '#858585', margin: '0', flex: '1' }}>{user.username}</p>
                        <p style={{ color: '#858585', margin: '0', flex: '1' }}>{user.dob}</p>
                        <p style={{ color: '#858585', margin: '0', flex: '1' }}>{user.status}</p>
                        <p style={{ color: '#858585', margin: '0', flex: '1' }}>{user.role}</p>
                        <button style={{ marginTop: '10px' }}>
                            <div style={{ color: "white", width: '80px', height: '20px', backgroundColor: '#ACC8FD', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => handleUserInfo(user)}>Edit</div>
                        </button>
                    </div>
                ))}
            </div>

            {showModal && selectedUser && (
                <StaffInfo handleClose={handleCloseModal} user={selectedUser}></StaffInfo>
            )}
        </main>
    );
}
