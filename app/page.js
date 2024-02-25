import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between" style={{ backgroundColor: '#E7E7E7' }}>




      <div style={{ width: '100%', height: 50, background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '50px' }}>
          <Image src="/Group 66.png" alt="logo" width={24} height={24} />
          <button>
            <p style={{ marginLeft: '8px' }}>Sign in</p>
          </button>

        </div>
      </div>
      <div style={{ width: 305, height: 542, background: '#D2DCF0', borderRadius: 42, display: 'flex', flexDirection: 'column', marginBottom: '90px', alignItems: 'center', position: 'relative', zIndex: '1' }}>
        <div style={{ marginTop: '60px' }}>
          <Image src="/figure.svg" alt="fig" width={124} height={124} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: 198, height: 55, background: 'white', borderRadius: 15, paddingLeft: '15px', paddingTop: '7px', marginTop: '30px' }}>
            {/* Add your input field here */}
            <p style={{ color: '#6B6B6B', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Email Address</p>
            <div style={{ display: 'flex', }}>
              <Image src="/Group 67.svg" alt="fig" width={23} height={16} />
              <input type="text" style={{ width: 140, height: '50%', outline: 'none', border: 'none', marginLeft: '5px', color: '#979797', fontFamily: 'Inter, sans-serif' }} placeholder="" />
            </div>

          </div>
          <div style={{ width: 198, height: 55, background: 'white', borderRadius: 15, marginBottom: '10px', paddingLeft: '15px', paddingTop: '7px', marginTop: '40px' }}>
            {/* Add your input field here */}
            <p style={{ color: '#6B6B6B', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Password</p>
            <div style={{ display: 'flex', }}>
              <Image src="/Group 68.svg" alt="fig" width={23} height={16} />
              <input type="password" style={{ width: 140, height: '50%', outline: 'none', border: 'none', padding: '3px', marginLeft: '5px', color: '#979797', fontFamily: 'Inter, sans-serif' }} placeholder="" />
            </div>


          </div>
          <button style={{ width: 198, height: 40, display: 'flex', alignItems: 'center', background: '#0057FF', borderRadius: 50, justifyContent: 'center', marginTop: '40px' }}>
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
        <p style={{ fontSize: '190px' }}>ADMINISTRATOR</p>
        <p style={{ fontSize: '190px' }}>SIGN IN</p>
      </div>
    </main>
  );
}
