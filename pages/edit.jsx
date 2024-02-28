import Image from 'next/image';
import React from 'react';

export default function Edit() {
    const generateList = () => {
        const listItems = [];
        for (let i = 0; i < 9; i++) {
            const isWhiteBackground = i % 2 === 0;
            const backgroundColor = isWhiteBackground ? '#fff' : '#F1F1F1';

            listItems.push(
                <div key={i} style={{ height: 50, backgroundColor, display: 'flex', alignItems: 'center', marginBottom: '10px', borderRadius: '10px', paddingLeft: '10px' }}>
                    <p style={{ color: '#858585' }}>
                        List Item {i + 1}
                    </p>
                </div>
            );
        }
        return listItems;
    };

    return (
        <main className="h-screen" style={{ backgroundColor: '#D2DCF0' }}>
            <div style={{ width: '100%', height: 50, background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '50px' }}>
                    <Image src="/Group 21.svg" alt="logo" width={24} height={24} />
                    <button>
                        <p style={{ marginLeft: '8px' }}>Sign in</p>
                    </button>
                </div>
            </div>

            <p style={{ marginTop: '20px', marginLeft: '30px' }}>
                Home - Admin - Edit
            </p>
            <p style={{ fontSize: '40px', color: 'white', backgroundColor: '#D2DCF0', textAlign: 'right', marginRight: '30px', fontWeight: 'bold' }}>
                Staff Management
            </p>

            <div style={{ marginTop: '20px', marginLeft: '30px', height: 700, marginRight: '30px', marginBottom: '60px', backgroundColor: 'white', borderRadius: '30px', boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.1)', padding: '20px', width: 'calc(100% - 60px)' }}>
                

                <div style={{ width: 460, height: 40, backgroundColor: '#0057FF', borderRadius: '30px', display: 'flex', paddingLeft: '10px', alignItems: 'center' }}>
                    <p style={{ color: 'white' }}>
                        Search Staff
                    </p>
                    <div style={{ marginLeft: '10px', width: 343, height: 34, backgroundColor: '#fff', borderRadius: '30px', display: 'flex', paddingLeft: '10px', alignItems: 'center' }}>
                        <div style={{ display: 'flex' }}>
                            <input type="text" style={{ width: 280, height: '50%', outline: 'none', border: 'none' }} />
                            <Image style={{ marginLeft: '15px' }} src="/Group 42.svg" alt="logo" width={24} height={24} />
                        </div>
                    </div>
                </div>
                <div style={{ marginTop:20,width: '100%', height: 40, backgroundColor: '#E3E3E3', borderRadius: '10px', display: 'flex', paddingLeft: '10px', alignItems: 'center', marginBottom: '10px' }}>
                    <p style={{ color: '#858585', fontWeight: 'bold', marginRight: '10px' ,marginLeft:60 }}>ID</p>
                    <p style={{ color: '#858585', fontWeight: 'bold', marginRight: '10px',marginLeft:140 }}>First Name</p>
                    <p style={{ color: '#858585', fontWeight: 'bold', marginRight: '10px',marginLeft:240  }}>Last Name</p>
                    <p style={{ color: '#858585', fontWeight: 'bold', marginRight: '10px' ,marginLeft:240 }}>BOD</p>
                    <p style={{ color: '#858585', fontWeight: 'bold', marginRight: '10px' ,marginLeft:240 }}>Status</p>
                    <p style={{ color: '#858585', fontWeight: 'bold', marginRight: '10px' ,marginLeft:240 }}>Position</p>
                    <p style={{ color: '#858585', fontWeight: 'bold' }}>Control</p>
                </div>
                {generateList()}
            </div>
        </main>
    );
}
