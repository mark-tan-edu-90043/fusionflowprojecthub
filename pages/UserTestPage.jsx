import { auth, db } from "../_utils/firebase";
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";

export default function UserTestPage() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [adminStatus, setAdminstatus] = useState(false);

    const getUserData = async () => {
        console.log("User data...");
        if (user) {
            //setUsername("Test1");
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUsername(userData.username);
                setAdminstatus(userData.adminStatus);
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
                window.location.href = '/';
            })
    };

    return (
        <div>
            {user ? (
                <div>
                    <h2>User Information</h2>
                    <p>Display Name: {user.displayName}</p>
                    <p>Email: {user.email}</p>
                    <p>Photo URL: {user.photoURL}</p>
                    <p>Email Verified: {user.emailVerified ? 'Yes' : 'No'}</p>
                    <p>Admin: {adminStatus ? 'Yes' : 'No'}</p>
                    <p>UID: {user.uid}</p>
                    <p>Username: {username}</p> 
                    <br></br>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
