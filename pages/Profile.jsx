import { auth, db } from "../_utils/firebase";
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function UserTestPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState("");

    const getUserData = async () => {
        console.log("User data...");
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUsername(userData.username);
                setRole(userData.role);
            }
        }
    };
    
    useEffect(() => {   
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                getUserData();
                console.log("Should work");
            } else {
                setUser(null); // No user signed in
            }
        });
        return () => unsubscribe();
    }, [user]);

    const handleSignOut = async (e) => {
        auth.signOut()
            .then(() => {
                router.push('/Login');
            })
    };

    const handleGoBack = () => {
        window.history.back(); // Go back to the previous page
    };

    return (
        <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#D2DCF0'  }}>
                
            <div style={{ width: '90%', fontSize: '30px', fontWeight: '700', color: '#fff', textAlign: 'end' }}>My Profile</div>
            {user ? (
                <div style={{
                    display: 'flex',
                    width: '90%',
                    height: '90%',
                    borderRadius: '10px',
                    backgroundColor: '#fff',
                    alignContent:'center'
               }}>  

                    <div className="container" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F1F1F1',
                        width: '100%',
                        boxSizing: 'border-box', 
                        overflowX: 'hidden' 
                    }}>
                        
                        <h2 style={{ color: '#858585', fontSize: '40px', fontWeight: 'bold', marginBottom: '10px',  }}>User Information</h2>
                        <div style={{color: '#858585',  marginRight: '10px', textAlign: 'left', marginBottom: '50px',}} >
                            <p >Display Name: {user.displayName}</p>
                            <p>Email: {user.email}</p>
                            <p>Photo URL: {user.photoURL}</p>
                            <p>Email Verified: {user.emailVerified ? 'Yes' : 'No'}</p>
                            <p>Role: {role}</p>
                            <p>UID: {user.uid}</p>
                            <p>Username: {username}</p> 
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '500px' }}>
                                <button onClick={handleSignOut} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Out</button>
                                
                                <button onClick={handleGoBack} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        
    </main>
    
    );
};
