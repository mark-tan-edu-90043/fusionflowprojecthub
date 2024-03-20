import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../_utils/firebase";
import { useRouter } from "next/router";

export default function Admin() {

    const router = useRouter();

    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        getUsersData();
    }, []);

    return (
        <main className="h-screen" style={{ backgroundColor: '#D2DCF0' }}>
            <div style={{ width: '100%', height: 50, background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '50px' }}>
                    <Image src="/Group 21.svg" alt="logo" width={24} height={24} />
                    <button>
                        <p style={{ marginLeft: '8px' }}>Sign in</p>
                    </button>
                </div>
            </div>

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
                            <input type="text" style={{ width: 280, height: '50%', outline: 'none', border: 'none' }} />
                            <Image style={{ marginLeft: '15px' }} src="/Group 42.svg" alt="logo" width={24} height={24} />
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#E3E3E3', borderRadius: '10px', display: 'flex', paddingLeft: '10px', alignItems: 'center', marginBottom: '10px' }}>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '1' }}>ID</p>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '2' }}>First Name</p>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '2' }}>Last Name</p>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '1' }}>BOD</p>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '1' }}>Status</p>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '2' }}>Position</p>
                        <p style={{ color: '#858585', fontWeight: 'bold', margin: '0', flex: '1' }}>Control</p>
                    </div>
                </div>
                {users.map((user, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', backgroundColor: index % 2 === 0 ? '#fff' : '#F1F1F1', borderRadius: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <p style={{ color: '#858585', margin: '0', flex: '1' }}>{user.uid}</p>
                        <p style={{ color: '#858585', margin: '0', flex: '2' }}>{user.name}</p>
                        <p style={{ color: '#858585', margin: '0', flex: '2' }}>{user.lastName}</p>
                        <p style={{ color: '#858585', margin: '0', flex: '1' }}>{user.bod}</p>
                        <p style={{ color: '#858585', margin: '0', flex: '1' }}>{user.status}</p>
                        <p style={{ color: '#858585', margin: '0', flex: '2' }}>{user.position}</p>
                        <p style={{ color: '#858585', margin: '0', flex: '1' }}>{/* Add control options here */}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
