ClientView.jsx

import React, { useState, useEffect } from 'react';
import { auth, db } from "../../_utils/firebase";
import { useRouter } from "next/router";
import ChatRoom from "./ChatRoom"; // Import ChatRoom component

export default function ClientView() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const projectsQuery = db.collection("projects");
                const projectsSnapshot = await projectsQuery.get();
                const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjects(projectsData);
            } else {
                setUser(null);
                setLoading(false);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        auth.signOut()
            .then(() => {
                router.push('/AdminLogin');
            })
            .catch(error => {
                console.error("Error signing out: ", error);
            });
    };

    if (loading) {
        return <div>Loading...</div>; // Render a loading indicator while loading
    }

    return (
        <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ width: '90%', fontSize: '30px', fontWeight: '700', color: '#fff', textAlign: 'end' }}>Client View</div>
            <div style={{ display: 'flex', width: '90%', height: '80%', borderRadius: '10px', backgroundColor: '#fff' }}>
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <button style={{ width:
