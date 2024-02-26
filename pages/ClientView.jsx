import Image from "next/image";
import React from 'react';
export default function ClientMangament() {
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
                            width: '780px'
                        }}>
                            <Image src="/Group 6.svg" alt="fig" width={86} height={86} />
                            <div style={{
                                marginLeft: '10px',
                                borderTop: '2px solid #ccc',
                                borderBottom: '2px solid #ccc',
                                color: '#ccc',
                                fontSize: '12px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    borderBottom: '2px solid #ccc',
                                    lineHeight: '20px'
                                }}> <Image style={{ marginRight: '4px' }} src='./Group 1.svg' width={14} height={14}></Image> 4647 16 Ave NW, Calgary, AB T3B OM7</div>
                                <div style={{
                                    display: 'flex',
                                    lineHeight: '20px'
                                }}><Image style={{ marginRight: '4px' }} src='./Group 15.svg' width={14} height={14}></Image>Project: Distribution System Development</div>
                                <div style={{
                                    display: 'flex',
                                    lineHeight: '20px'
                                }}><Image style={{ marginRight: '4px' }} src='./Group 2.svg' width={14} height={14}></Image>Contact Person: Tom Johnson</div>
                                <div style={{
                                    display: 'flex',
                                    lineHeight: '20px'
                                }}><Image style={{ marginRight: '4px' }} src='./Group 1.svg' width={14} height={14}></Image>Phone:+18773466244</div>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '25px'
                        }}>
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
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        lineHeight: '20px',
                                        textAlign: 'center',
                                        color: '#fff'
                                    }}>3</div>
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
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}