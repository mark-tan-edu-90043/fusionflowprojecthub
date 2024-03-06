import Image from "next/image";
import React, {useState, useEffect} from 'react';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../_utils/firebase";

export default function DeveloperPage() {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true); 

    const getUserData = async () => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setIsAdmin(userData.role === "Admin");
            }
            setLoading(false); // Set loading to false after admin check is done
        }
    };
    
    useEffect(() => {   
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                getUserData();
                console.log("Should work");
            } else {
                setUser(null); 
                setLoading(false);
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

    if (loading) {
        return <div>Loading...</div>; // Render a loading indicator while loading
    }

    return (
        <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            <nav style={{ backgroundColor: '#6B9EFF', width: '100%', padding: '20px 0', textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>
                <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}>
                    <li style={{paddingRight: 20}}>Developer Dashboard</li>
                    {isAdmin && <li onClick={() => window.location.href='/Admin'} style={{cursor: 'pointer'}}>Admin Panel</li>}
                </ul>
            </nav>

            <div style={{ width: '90%', fontSize: '30px', fontWeight: '700', color: '#fff', textAlign: 'end' }}>Developer</div>
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
                        <button style={{
                            width: '66px',
                            height: '32px',
                            background: 'linear-gradient(to bottom, #fc6c45, #ffc6b7)',
                            color: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0px 3px 2px #dc4c25',
                            marginTop: '10px',
                            marginRight: '10px'
                        }}>Close</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "space-between",
                            alignItems: 'center',
                            width: '250px',
                            height: '520px',
                            padding: '0 10px',
                            borderRight: '2px solid #ccc',
                        }}>
<div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "space-between",
                            marginLeft: '20px',
                            width: '250px',
                            height: '520px',
                            padding: '0 10px',
                            backgroundColor: '#6B9EFF',
                            borderRadius: '10px',
                        }}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    fontSize: '13px'
                                }}>
                                    <span style={{ fontWeight: 700 }}>To do</span>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        lineHeight: '20px',
                                        textAlign: 'center',
                                        color: '#fff'
                                    }}>2</div>
                                </div>
                                <div style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                    marginTop: '20px',
                                    color: '#ccc'
                                }}>
                                    Back End development
                                </div>
                                <div style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                    marginTop: '20px',
                                    color: '#ccc'
                                }}>
                                    Front End development
                                </div>
                            </div>
                            <div style={{
                                marginBottom: '20px',
                                padding: '8px',
                                border: '1px dotted #000',
                                fontSize: '13px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)'
                            }}>
                                + <span>Add new task</span>
                            </div>
                        </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: "space-between",
                                alignItems: 'center',
                                width: '100%',
                                padding: '8px 8px 0 8px',
                                fontSize: '13px',
                                color: '#fff'
                            }}>
                                
                                    
                               
                            </div>
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "space-between",
                            marginLeft: '20px',
                            width: '250px',
                            height: '520px',
                            padding: '0 10px',
                            backgroundColor: '#49d290',
                            borderRadius: '10px',
                        }}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    fontSize: '13px'
                                }}>
                                    <span style={{ fontWeight: 700 }}>In progress Task</span>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        lineHeight: '20px',
                                        textAlign: 'center',
                                        color: '#fff'
                                    }}>2</div>
                                </div>
                                <div style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                    marginTop: '20px',
                                    color: '#ccc'
                                }}>
                                    Database
                                </div>
                                <div style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                    marginTop: '20px',
                                    color: '#ccc'
                                }}>
                                    placehold
                                </div>
                            </div>
                            <div style={{
                                marginBottom: '20px',
                                padding: '8px',
                                border: '1px dotted #000',
                                fontSize: '13px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)'
                            }}>
                                + <span>Add new task</span>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "space-between",
                            width: '250px',
                            height: '520px',
                            margin: '0 15px',
                            padding: '0 10px',
                            backgroundColor: '#adc9fd',
                            borderRadius: '10px',
                        }}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    fontSize: '13px'
                                }}>
                                    <span style={{ fontWeight: 700 }}>Completed Task</span>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        lineHeight: '20px',
                                        textAlign: 'center',
                                        color: '#fff'
                                    }}>1</div>
                                </div>
                                <div style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                    marginTop: '20px',
                                    color: '#ccc'
                                }}>
                                    Ul design
                                </div>
                            </div>
                            <div style={{
                                marginBottom: '20px',
                                padding: '8px',
                                border: '1px dotted #000',
                                fontSize: '13px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)'
                            }}>
                                + <span>Add new task</span>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "space-between",
                            width: '250px',
                            height: '520px',
                            padding: '0 10px',
                            backgroundColor: '#ffc2af',
                            borderRadius: '10px',
                        }}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    fontSize: '13px'
                                }}>
                                    <span style={{ fontWeight: 700 }}>Participating Staff</span>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        lineHeight: '20px',
                                        textAlign: 'center',
                                        color: '#fff'
                                    }}>1</div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: "space-between",
                                    backgroundColor: '#fff',
                                    borderRadius: '18px',
                                    padding: '10px',
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                    marginTop: '20px',
                                    color: '#ccc'
                                }}>
                                    <div style={{ display: 'flex' }}>
                                        <Image width={20} height={20} src='/Group 6.svg' />
                                        <span style={{ marginLeft: '6px' }}>Cheelix zhang</span>
                                    </div>
                                    <span>Design</span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: "space-between",
                                    backgroundColor: '#fff',
                                    borderRadius: '18px',
                                    padding: '10px',
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                    marginTop: '20px',
                                    color: '#ccc'
                                }}>
                                    <div style={{ display: 'flex' }}>
                                        <Image width={20} height={20} src='/Group 6.svg' />
                                        <span style={{ marginLeft: '6px' }}>Mick Tang
                                        </span>
                                    </div>
                                    <span>Testing</span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: "space-between",
                                    backgroundColor: '#fff',
                                    borderRadius: '18px',
                                    padding: '10px',
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                    marginTop: '20px',
                                    color: '#ccc'
                                }}>
                                    <div style={{ display: 'flex' }}>
                                        <Image width={20} height={20} src='/Group 6.svg' />
                                        <span style={{ marginLeft: '6px' }}>Marry Lee</span>
                                    </div>
                                    <span>Code</span>
                                </div>
                            </div>
                            {/* <div style={{
                                marginBottom: '20px',
                                padding: '8px',
                                border: '1px dotted #000',
                                fontSize: '13px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)'
                            }}>
                                
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
