import Image from "next/image";
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between" style={{ backgroundColor: '#E7E7E7' }}>

        <div style={{ width: '100%', height: 50, background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '50px' }}>
    {/*
            <button>
              <Image src="/Group 39.svg" alt="logo" width={90} height={50} />
            </button>
    */}
          </div>
        </div>
        <div style={{ width: 305, height: 542, background: '#D3D2F0', borderRadius: 42, display: 'flex', flexDirection: 'column', marginBottom: '180px', alignItems: 'center', position: 'relative', zIndex: '1' }}>
          <div style={{ marginTop: '60px' }}>
            <Image src="/Group 6.svg" alt="fig" width={124} height={124} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <div style={{ width: 198, height: 55, background: 'white', borderRadius: 15, paddingLeft: '15px', paddingTop: '7px', marginTop: '30px' }}>
              {/* Add your input field here */}
              <p style={{ color: '#6B6B6B', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Email Address</p>
              <div style={{ display: 'flex', }}>
                <Image src="/Group 2.svg" alt="fig" width={23} height={16} />
                <input type="text" style={{ width: 140, height: '50%', outline: 'none', border: 'none', marginLeft: '5px', color: '#979797', fontFamily: 'Inter, sans-serif' }} placeholder="" />
              </div>

            </div>
            <div style={{ width: 198, height: 55, background: 'white', borderRadius: 15, marginBottom: '10px', paddingLeft: '15px', paddingTop: '7px', marginTop: '40px' }}>
              {/* Add your input field here */}
              <p style={{ color: '#6B6B6B', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Password</p>
              <div style={{ display: 'flex', }}>
                <Image src="/Group 1.svg" alt="fig" width={23} height={16} />
                <input type="password" style={{ width: 140, height: '50%', outline: 'none', border: 'none', padding: '3px', marginLeft: '5px', color: '#979797', fontFamily: 'Inter, sans-serif' }} placeholder="" />
              </div>
            </div>
            <button style={{ width: 198, height: 40, display: 'flex', alignItems: 'center', background: '#7000FF', borderRadius: 50, justifyContent: 'center', marginTop: '40px' }}>
              <p style={{ color: 'white', fontSize: '18px', fontFamily: 'Inter, sans-serif', fontWeight: '900', fontStyle: 'italic' }}>Sign in</p>
            </button>

          </div>

        </div>
        <div style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          zIndex: '0', 
          color: '#FFFFFF',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '900',
          fontStyle: 'italic',
          textAlign: 'right',

          marginBottom: '-20px'
        }}>
          <p style={{ fontSize: '190px' }}>WELCOME</p>

        </div>
        {/*admin sign in link */}
        <button style={{ position: 'absolute', bottom: '20px', left: '20px'}}>  
          <Link href="/AdminPage">

            <Image src="/Group 4.svg" alt="Admin Sign In" width={170} height={50} />

          </Link>
        </button>

        {/*admin sign in link */}
        <button style={{ position: 'absolute', bottom: '70px', left: '20px'}}>  
          <Link href="/SignUp">

          <div style={{ width: '170px', height: '35px', backgroundColor: 'blue', borderRadius: '50px' }}> Sign up</div>

          </Link>
        </button>

        
      </main>
    );
}