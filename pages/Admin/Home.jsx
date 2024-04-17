import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, getFirestore } from "firebase/firestore";
import { db } from "../../_utils/firebase";
import { useRouter } from "next/router";
import StaffInfo from "../components/StaffInfo";
import { auth } from '../../_utils/firebase';
import CreateUser from "../CreateUser";


export default function Admin() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                const usersQuery = query(collection(db, "users"));
                const usersSnapshot = await getDocs(usersQuery);
                const usersData = usersSnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }))
                setUsers(usersData);
            } else {
            }
        });
        return () => unsubscribe();
    }, []);

    const filteredNames = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (event) => {
        setSearchQuery(event.target.value); // Update the search query state with the input value
    };

    const handleUserInfo = (user) => {
        setSelectedUser(user); // Set the selected user
        console.log(selectedUser);
        setShowModal(true); // Show the modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Hide the modal
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.backgroundColor = '#f2f2f2';
        e.currentTarget.style.color = '#000000';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.backgroundColor = '#007bff';
        e.currentTarget.style.color = '#fff';
    };

    return (
        <main className="h-screen" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', backgroundColor: '#D2DCF0' }} >


            <div style={{ width: '100%', background: 'white', paddingTop: '5px', paddingBottom: '5px', display: 'flex', justifyContent: 'center' }}>
                <img src="/LOG 1.svg" alt="Logo" width={170} height={80}></img>
                <div style={{ width: '78%', }}>
                    <nav style={{ background: 'white', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
                        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'flex-end', alignContent: 'center', }}>
                            <li onClick={() => { router.push('../Profile') }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>My Profile</li>
                            <li onClick={() => router.push('/calendar')}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Calendar</li>
                            <li onClick={() => router.push('/Developer/Home')}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Developer Dashboard</li>
                            <li onClick={() => router.push('/Admin/Home')}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Admin Panel</li>
                            <li onClick={() => auth.signOut().then(() => { router.push('../AdminLogin') })}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', }}>Log Out</li>
                        </ul>
                    </nav>
                </div>
            </div>




            {/* search box */}

            <div style={{ width: '100%', paddingTop: '10px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '90%', marginTop: "30px" }}>
                    <div style={{ alignItems: "flex-end", display: "flex", flexDirection: "row", justifyContent: "space-between", }}>



                        <div style={{ width: 520, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3C89FC', borderRadius: '10px', paddingLeft: '13px', marginBottom: '10px' }}>
                            <p style={{ color: 'white' }}>Search Users</p>
                            <div style={{ width: 380, height: 34, backgroundColor: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <input type="text" style={{ color: 'black', width: 280, height: '50%', outline: 'none', border: 'none' }} value={searchQuery} onChange={handleSearch} />
                                </div>
                                <Image style={{ marginLeft: '60px' }} src="/Group 23.png" alt="search" width={24} height={24} />
                            </div>
                        </div>

                        <button style={{paddingBottom: 10}}>
                            <div style={{ display: 'flex', width: '170px', height: '35px', backgroundColor: '#0057FF', borderRadius: '10px', alignItems: 'center', justifyContent: 'center', color: 'white'}} onClick={ () => (router.push('../CreateUser'))}>Create User</div>
                        </button>


                        <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#fff', }}>Staff Management</div>


                    </div>


                </div>
            </div>

            <div style={{
                
                width: '90%',
                marginBottom: '30px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.1)', padding: '20px',
                overflowY:'auto'
            }}>




                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', }}>

                    <div style={{
                        backgroundColor: '#E3E3E3',
                        borderRadius: '5px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        paddingLeft: '20px',
                        paddingRight: '20px'
                    }}>
                        <div style={{ color: '#858585', fontWeight: 'bold', textAlign: 'center', maxWidth: '150px', flex: '1', }}>ID</div>
                        <div style={{ color: '#858585', fontWeight: 'bold', textAlign: 'center', flex: '1' }}>Name</div>
                        <div style={{ color: '#858585', fontWeight: 'bold', textAlign: 'center', flex: '1' }}>Username</div>
                        <div style={{ color: '#858585', fontWeight: 'bold', textAlign: 'center', flex: '1' }}>Hire Date</div>
                        <div style={{ color: '#858585', fontWeight: 'bold', textAlign: 'center', flex: '1' }}>Status</div>
                        <div style={{ color: '#858585', fontWeight: 'bold', textAlign: 'center', flex: '1' }}>Position</div>
                        <div style={{ color: '#858585', fontWeight: 'bold', flex: '1', maxWidth: '150px', textAlign: 'center' }}>Control</div>
                    </div>

                </div>
                {filteredNames.map((user, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: index % 2 === 0 ? '#fff' : '#F1F1F1',
                        borderRadius: '5px',
                        paddingLeft: '20px',
                        paddingRight: '20px'
                    }}>
                        <div style={{ color: '#858585', margin: '0', flex: 1, maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center', fontWeight: 'bold' }}>{user.uid}</div>
                        <div style={{ color: '#858585', margin: '0', flex: 1, maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center', fontWeight: 'bold' }}>{user.name}</div>
                        <div style={{ color: '#858585', margin: '0', flex: 1, maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center', fontWeight: 'bold' }}>{user.username}</div>
                        <div style={{ color: '#858585', margin: '0', flex: 1, maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center', fontWeight: 'bold' }}>{user.dob}</div>
                        <div style={{ color: '#858585', margin: '0', flex: 1, maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center', fontWeight: 'bold' }}>{user.status}</div>
                        <div style={{ color: '#858585', margin: '0', flex: 1, maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center', fontWeight: 'bold' }}>{user.role}</div>
                        <div style={{ margin: '10px 0', flex: 1, maxWidth: '150px', display: 'flex', justifyContent: 'center' }}>
                            <div style={{
                                color: 'white',
                                width: '80px',
                                height: '20px',
                                backgroundColor: '#ACC8FD',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }} onClick={() => handleUserInfo(user)}>Edit</div>
                        </div>
                    </div>
                ))}


            </div>

            {showModal && selectedUser && (
                <StaffInfo handleClose={handleCloseModal} user={selectedUser}></StaffInfo>
            )}
        </main>
    );
}
