
           import React, { useState, useEffect } from 'react';
import { auth } from "../../_utils/firebase";
import { useRouter } from "next/router";
import ChatRoom from "./ChatRoom"; // Import ChatRoom component

export default function ClientManagment() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
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
                        <button style={{ width: '66px', height: '32px', background: 'linear-gradient(to bottom, #fc6c45, #ffc6b7)', color: '#fff', borderRadius: '16px', boxShadow: '0px 3px 2px #dc4c25', marginTop: '10px', marginRight: '10px' }} onClick={handleSignOut}>Sign Out</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        {/* Replace "your_project_id" with the actual project ID and ensure to pass the correct user ID for the client */}
                        <ChatRoom projectId="your_project_id" userType="Client" userId={user ? user.uid : ''} />
                    </div>
                </div>
            </div>
        </main>
    );
}
                     
