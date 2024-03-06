import { auth, db } from "../_utils/firebase";
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import DeveloperPage from "./DeveloperPage";
import Admin from "./Admin";

export default function AdminHome() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const getUserData = async () => {
        console.log("User data...");
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setRole(userData.role);
                setIsAdmin(userData.role === "Admin");
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
            <nav style={{display: 'flex'}}>
                <ul style={{listStyleType: 'none', margin: 0, padding: 0, display: 'flex'}}>
                    <li style={{marginRight: '10px'}}>Developer Dashboard</li>
                    {isAdmin && <li style={{marginRight: '10px'}}>Admin Panel</li>}
                </ul>
            </nav>  
        </div>
    );
};
