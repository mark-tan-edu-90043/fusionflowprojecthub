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
                <ul style={{ listStyleType: 'none',  display: 'flex', justifyContent: 'space-around', alignContent:'center', padding:'0px 200px'}}>
                    <li onClick={() => { router.push('../Profile') }} style={{backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>My Profile</li>
                    <li onClick={() => router.push('/Developer/Home')} style={{backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Developer Dashboard</li>
                    <li style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Admin Panel</li>
                    <li onClick={() => auth.signOut().then(() => { router.push('../AdminLogin') })} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Log Out</li>
                </ul>
            </nav>

            <p style={{ marginTop: '20px', marginLeft: '30px' }}>
                Home - Admin
            </p>
            <p style={{ fontSize: '40px', color: 'white', backgroundColor: '#D2DCF0', textAlign: 'right', marginRight: '30px', fontWeight: 'bold' }}>
                Staff Management
            </p>

            <div style={{ marginTop: '20px', marginLeft: '30px', marginRight: '30px', marginBottom: '60px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', }}>
                    <div style={{ width:500, height:40, display: 'flex',  alignItems: 'center', backgroundColor: '#0057FF', borderRadius: '30px', paddingLeft: '10px',  marginBottom: '10px' }}>
                        <p style={{ color: 'white' }}>Search Staff</p>
                        <div style={{ width: 380, height: 34, backgroundColor: '#fff', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent:'center',marginLeft:'15px' }}>
                            <div style={{display:'flex', alignItems: 'center', justifyContent:'center'}}>
                                <input type="text" style={{ color: 'black', width: 280, height: '50%', outline: 'none', border: 'none' }} value={searchQuery} onChange={handleSearch} />   
                            </div>
                            <Image style={{ marginLeft: '60px' }} src="/Group 23.png" alt="search" width={24} height={24} />
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
