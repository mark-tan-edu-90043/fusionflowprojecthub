import Image from "next/image";
import React, { useState } from 'react';
import { v4 } from "uuid";

export default function ClientManagment() {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProject, setSelectedProject] = useState("project1");
    const selectProject = (projectId) => {
        setSelectedProject(projectId);
        setShowPopup(!showPopup);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const projectData = {
        project1: {
          inProgressTasks: ["Task 1", "Task 2"],
          participatingStaff: ["Staff A", "Staff B"],
          completedTasks: ["Task 3"]
        },
        
      };

    return (
        <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ width: '90%', fontSize: '30px', fontWeight: '700', color: '#fff', textAlign: 'end' }}>Client View</div>
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',

                    }}>
                        
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '25px'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "space-between",
                                // marginLeft: '20px',
                                width: '250px',
                                height: '480px',
                                padding: '0 10px',
                                backgroundColor: '#6B9EFF',
                                borderRadius: '10px',
                                marginRight: '15px'
                            }}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '10px',
                                        fontSize: '13px',
                                        
                                    }}>
                                        <span style={{ fontWeight: 700 }}>Project</span>
                                    </div>
                                    <div onClick={()=>selectProject("project1")} style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    fontSize: '13px',
                                    lineHeight: '20px',
                                    marginTop: '20px',
                                    color: '#ccc',
                                    cursor: 'pointer'
                                }}>
                                    
                                    Project 1
                                    
                                        {showPopup && (
                                                <div className="popup">
                                                    <div className="popup-content">
                                                    
                                                        <h2>Company Name:</h2>
                                                        <h2>Address:</h2>
                                                        <h2>Contact Person:</h2>
                                                        <h2>Number:</h2>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                       
                                    <div  style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        fontSize: '13px',
                                        lineHeight: '20px',
                                        marginTop: '20px',
                                        color: '#ccc'
                                    }}>
                                        Project 2
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
                                        Project 3
                                    </div>    
                                </div>
                            </div>
                            <div style={{
                                width: '250px',
                                height: '480px',
                                padding: '0 10px',
                                backgroundColor: '#49d290',
                                borderRadius: '10px',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    fontSize: '13px'
                                }}>
                                    <span style={{ fontWeight: 700 }}>In progress Task</span>
                                    
                                    
                                </div>
                                {projectData[selectedProject].inProgressTasks.map((task) => (
                                <div key={v4()} style={{
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
                                ))}
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
                                width: '250px',
                                height: '480px',
                                margin: '0 15px',
                                padding: '0 10px',
                                backgroundColor: '#adc9fd',
                                borderRadius: '10px',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    fontSize: '13px'
                                }}>
                                    <span style={{ fontWeight: 700 }}>Completed Task</span>
                                    
                                </div>
                                {projectData[selectedProject].inProgressTasks.map((task) => (
                                    <div key={v4()} style={{
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
                                ))}    
                            </div>
                            <div style={{
                                width: '250px',
                                height: '480px',
                                padding: '0 10px',
                                backgroundColor: '#ffc2af',
                                borderRadius: '10px',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    fontSize: '13px'
                                }}>
                                    <span style={{ fontWeight: 700 }}>Participating Staff</span>   
                                </div>
                                {projectData[selectedProject].inProgressTasks.map((staff) => {
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
                                    <div key={v4()} style={{ display: 'flex' }}>
                                        <Image width={20} height={20} src='/Group 6.svg' />
                                        <span style={{ marginLeft: '6px' }}>Cheelix zhang</span>
                                    </div>
                                    <span>Design</span>
                                </div>
                                })}
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
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
