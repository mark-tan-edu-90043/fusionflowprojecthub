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
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value); // Update the search query state with the input value
    };

    if (loading) {
        return <div>Loading...</div>; // Render a loading indicator while loading
    }

    return (
        <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#D2DCF0' }}>

            <nav style={{ width: '100%', height: 50, background: 'white', display: 'flex', flexDirection: 'column', alignContent:'center', justifyContent:'center' }}>
                <ul style={{ listStyleType: 'none',  display: 'flex', justifyContent: 'space-around', alignContent:'center', padding:'0px 200px' }}>
                    <li onClick={() => { router.push('../Profile') }} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>My Profile</li>
                    <li style={{backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Developer Dashboard</li>
                    <li onClick={() => router.push('/Admin/Home')} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Admin Panel</li>
                    <li onClick={() => auth.signOut().then(() => { router.push('../AdminLogin') })} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>Log Out</li>
                </ul>
            </nav>

            <div style={{ width: '90%', fontSize: '40px', fontWeight: 'bold', color: '#fff', textAlign: 'end', }}>My Projects</div>
            
                <div style={{ width:520, height:40, display: 'flex',  alignItems: 'center', justifyContent:'center', backgroundColor: '#3C89FC', borderRadius: '30px', paddingLeft: '10px',  marginBottom: '10px' }}>
                    <p style={{ color: 'white' }}>Search Project</p>
                    <div style={{ width: 380, height: 34, backgroundColor: '#fff', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent:'center',marginLeft:'15px' }}>
                        <div style={{display:'flex', alignItems: 'center', justifyContent:'center'}}>
                        <input type="text" style={{ color: 'black', width: 280, height: '50%', outline: 'none', border: 'none' }} value={searchQuery} onChange={handleSearchInputChange}/>   
                        </div>
                        <Image style={{ marginLeft: '60px' }} src="/Group 23.png" alt="search" width={24} height={24} />
                    </div>
                </div>
               
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
                        {filteredProjects.map(project => (
                            <div key={project.id} style={{
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
