import Image from "next/image";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { auth, googleAuth, ghAuth, db } from "../_utils/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";

const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check user role
      const docRef = await doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const role = docSnap.data().role;

      // Allow only admins or developers to log in
      if (role === 'Admin' || role === 'Developer') {
        // Redirect to the appropriate dashboard or page
        router.push('/Developer/Home');
      } else {
        auth.signOut();
        setErrorMessage('You do not have permission to access this page.');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setErrorMessage('Incorrect email or password. Please try again.');
    }
  };

  const handleGoogleAuth = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithPopup(auth, googleAuth);
      const user = userCredential.user;

      // Check user role
      const docRef = await doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const role = docSnap.data().role;

      // Allow only admins or developers to log in
      if (role === "Admin" || role === "Developer") {
        // Redirect to the appropriate dashboard or page
        router.push('/Developer/Home');
      } else {
        auth.signOut();
        setErrorMessage('You do not have permission to access this page.');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setErrorMessage('Incorrect email or password. Please try again.');
    }
  };

  const handleGitHubAuth = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithPopup(auth, ghAuth);
      const user = userCredential.user;

      // Check user role
      const docRef = await doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const role = docSnap.data().role;

      // Allow only admins or developers to log in
      if (role === 'Admin' || role === 'Developer') {
        // Redirect to the appropriate dashboard or page
        router.push('/Developer/Home');
      } else {
        auth.signOut();
        setErrorMessage('You do not have permission to access this page.');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setErrorMessage('Incorrect email or password.Please try again.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between" style={{ backgroundColor: '#E7E7E7' }}>

      <div style={{ width: '100%', height: 50, background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
        <img src="Slice 1.svg" alt="Logo" width={170} height={70}></img>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '50px' }}>
          {/* <Image src="/Group 21.svg" alt="logo" width={24} height={24} />
          <button>
            <p style={{ marginLeft: '8px' }}>Sign in</p>
          </button> */}
        </div>
      </div>
      <div style={{ width: 305, height: 542, background: '#D2DCF0', borderRadius: 42, display: 'flex', flexDirection: 'column', marginBottom: '160px', alignItems: 'center', position: 'relative', zIndex: '1' }}>
        <div style={{ marginTop: '60px' }}>
          <Image src="/Group 66.svg" alt="fig" width={124} height={124} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: 198, height: 55, background: 'white', borderRadius: 15, paddingLeft: '15px', paddingTop: '7px', marginTop: '30px' }}>
            <p style={{ color: '#6B6B6B', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Email Address</p>
            <div style={{ display: 'flex', }}>
              <Image src="/Group 2.svg" alt="fig" width={23} height={16} />
              <input type="text" style={{ width: 140, height: '50%', outline: 'none', border: 'none', marginLeft: '5px', color: '#979797', fontFamily: 'Inter, sans-serif' }} placeholder="" onChange={handleEmailChange} />
            </div>
          </div>
          <div style={{ width: 198, height: 55, background: 'white', borderRadius: 15, marginBottom: '10px', paddingLeft: '15px', paddingTop: '7px', marginTop: '40px' }}>
            <p style={{ color: '#6B6B6B', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>Password</p>
            <div style={{ display: 'flex', }}>
              <Image src="/Group 1.svg" alt="fig" width={23} height={16} />
              <input type="password" style={{ width: 140, height: '50%', outline: 'none', border: 'none', marginLeft: '5px', color: '#979797', fontFamily: 'Inter, sans-serif' }} placeholder="" onChange={handlePasswordChange} />
            </div>
          </div>
          <div style={{
              color: 'grey',
              position: 'absolute',
              top: '390px', // Changed marginTop to top for proper CSS
              textAlign: 'center',
              width: '200px', // Adjust the width as needed
              wordWrap: 'break-word', // This will ensure words break and wrap onto the next line
              overflowWrap: 'break-word', // Use this for better support across different browsers
              left: '50%',
              transform: 'translateX(-50%)',
              lineHeight: 1
            }}>{errorMessage}</div>

          <button style={{ width: 198, height: 40, display: 'flex', alignItems: 'center', background: '#0057FF', borderRadius: 50, justifyContent: 'center', marginTop: '40px' }} onClick={handleSubmit}>
            <p style={{ color: 'white', fontSize: '18px', fontFamily: 'Inter, sans-serif', fontWeight: '900', fontStyle: 'italic' }}>Sign in</p>
          </button>
          {/* <button style={{ position: 'absolute', bottom: '0px', left: '50px'}} onClick={handleGoogleAuth}>
            <Image src="/Google.svg" alt="Google Sign In" width={30} height={30} />
          </button>
          <button style={{ position: 'absolute', bottom: '0px', left: '150px'}} onClick={handleGitHubAuth}>
            <Image src="/Github.png" alt="GitHub Sign In" width={30} height={30} />
          </button> */}
              <div className="sign-in-buttons" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: '0px',
                    left: '0',
                    right: '0',
                    marginBottom: '20px'
                  }}>
                    <button onClick={handleGoogleAuth}>
                      <Image src="/Google.svg" alt="Google Sign In" width={30} height={30} />
                    </button>
                    <button onClick={handleGitHubAuth} style={{ marginLeft: '20px' }}>
                      <Image src="/Github.png" alt="GitHub Sign In" width={30} height={30} />
                    </button>
              </div>
          
        </div>
      </div>
      <div style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: '0', 
        color: '#EFEFEF',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '900',
        fontStyle: 'italic',
        textAlign: 'right',
        marginBottom: '35px'
      }}>
        <p style={{ fontSize: '190px' }}>ADMINISTRATOR</p>
        <p style={{ fontSize: '190px' }}>SIGN IN</p>
      </div>

      <button style={{ position: 'absolute', bottom: '70px', left: '20px' }}>  
        <Link href="/Login">
        <div style={{
              width: '170px',
              height: '35px',
              backgroundColor: '#0057FF',
              borderRadius: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center', 
              color: 'white', 
              fontFamily: 'Arial, sans-serif', 
              fontSize: '14px', 
            }}>Client Sign in</div>
        </Link>
      </button>
    </main>
  );
}

export default AdminLogin;
