import Image from "next/image";
import React from 'react';

export default function Admin() {
    return (
        <main style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ width: '90%', fontSize: '30px', fontWeight: '700', color: '#fff', textAlign: 'end' }}>Admin</div>
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
                                fontSize: '13px',
                                color: '#ccc',
                                marginTop: '10px',
                                marginBottom: '10px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '8px',
                                    marginBottom: '20px',
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                }}>
                                    <Image width={100} height={100} src='/Group 6.svg'></Image>
                                </div>
                                <div style={{paddingTop: '5px'}}><span style={{ fontWeight: 700 }}>StaffiD:</span> 000897055</div>
                                <div style={{paddingTop: '5px'}}><span style={{ fontWeight: 700 }}>Name:</span> Cheelix Zhang</div>
                                <div style={{paddingTop: '5px'}}><span style={{ fontWeight: 700 }}>DOB:</span> JAN 01 2000</div>
                                <div style={{paddingTop: '5px'}}><span style={{ fontWeight: 700 }}>Position:</span> Designer</div>
                                <div style={{paddingTop: '5px'}}><span style={{ fontWeight: 700 }}>Status:</span> Employed</div>
                                <div style={{paddingTop: '5px'}}><span style={{ fontWeight: 700 }}>Projects:</span>  25</div>
                                <div style={{paddingTop: '5px'}}><span style={{ fontWeight: 700 }}>Current pro:</span> 3</div>
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
                                <div style={{
                                    display: 'flex',
                                    padding: '2px 20px',
                                    backgroundColor: '#6b9eff',
                                    borderRadius: '12px'
                                }}>
                                    <Image style={{
                                        marginRight: '5px'
                                    }} src='./Group 15.svg' width={15} height={15}></Image>
                                    Edit
                                </div>
                                <div style={{
                                     display: 'flex',
                                    padding: '2px 20px',
                                    backgroundColor: '#e66098',
                                    borderRadius: '12px'
                                }}>
                                     <Image style={{
                                        marginRight: '5px'
                                    }} src='./Group 15.svg' width={15} height={15}></Image>
                                    Resigned</div>
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
                            <div style={{
                                marginBottom: '20px',
                                padding: '8px',
                                border: '1px dotted #000',
                                fontSize: '13px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)'
                            }}>
                                + <span>Add new staff</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}