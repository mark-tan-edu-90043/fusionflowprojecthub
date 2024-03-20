import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../_utils/firebase";
import { useRouter } from "next/router";
import Popups from "../components/AddProject";

export default function DeveloperPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false); // State to store admin status
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDoc = await getDoc(doc(db, "users", currentUser.uid)); // Assuming user data is stored in "users" collection
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.role === 'Admin') { // Check if user is an admin
                        setIsAdmin(true);
                    }
                }
                const projectsQuery = query(collection(db, "projects"), where("developers", "array-contains", currentUser.uid)); //Grab all projects where the Developer is involved
                const projectsSnapshot = await getDocs(projectsQuery);
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

    const handleProjectClick = (projectId) => {
        router.push({
            pathname: `/projects/${projectId}`,
            query: { projectId: projectId } //Passes along the Project ID in redirect
        });
    };

    if (loading) {
        return <div>Loading...</div>; // Render a loading indicator while loading
    }

    return (
        <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#D2DCF0' }}>

            <nav style={{ width: '100%', height: 50, background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <ul style={{ listStyleType: 'none', color: 'black', margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}>
                    <li onClick={() => { router.push('../Profile') }} style={{ padding: 20, cursor: 'pointer' }}>My Profile</li>
                    <li onClick={() => auth.signOut().then(() => { router.push('../AdminLogin') })} style={{ padding: 20, cursor: 'pointer' }}>Log Out</li>
                    <li style={{ padding: 20, fontWeight: "bold" }}>Developer Dashboard</li>
                    <li onClick={() => router.push('/Admin/Home')} style={{ padding: 20, cursor: 'pointer' }}>Admin Panel</li>
                </ul>
            </nav>

            <div style={{ width: '90%', fontSize: '30px', fontWeight: '700', color: '#fff', textAlign: 'end' }}>My Projects</div>
            <div style={{
                display: 'flex',
                width: '90%',
                height: '80%',
                borderRadius: '10px',
                backgroundColor: '#fff'
            }}>
                <div style={{ width: '100%' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                        {projects.map(project => (
                            <div key={project.id} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '250px',
                                height: '250px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                margin: '10px',
                                cursor: 'pointer'
                            }} onClick={() => handleProjectClick(project.id)}>
                                <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: 'black' }}>{project.name}</div>
                                <div style={{ color: 'black'}}>{project.description}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '250px',
                                height: '250px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                margin: '10px',
                                cursor: 'pointer'
                            }} onClick={() => handleOpenModal()}>
                                <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: 'black' }}>Create New Project</div>
                                <div style={{ color: 'black'}}>+</div>
                            </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
                    <Popups handleClose={handleCloseModal} />
                </div>
            )}
        </main>
    );
}
