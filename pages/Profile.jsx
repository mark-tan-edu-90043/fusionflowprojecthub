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
        <div>
            {user ? (
                <div>
                    <h2>User Information</h2>
                    <p>Display Name: {user.displayName}</p>
                    <p>Email: {user.email}</p>
                    <p>Photo URL: {user.photoURL}</p>
                    <p>Email Verified: {user.emailVerified ? 'Yes' : 'No'}</p>
                    <p>Role: {role}</p>
                    <p>UID: {user.uid}</p>
                    <p>Username: {username}</p> 
                    <br></br>
                    <button onClick={handleSignOut}>Sign Out</button>
                    <br />
                    <button onClick={handleGoBack}>Back</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
