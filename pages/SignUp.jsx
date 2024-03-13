import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuth, ghAuth, db } from "../_utils/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/router';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        username: username,
        role: "Client"
      });

      setSuccessMessage('Sign up successful! You will be redirected to the login page shortly.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear success message after 3 seconds
      router.push('/Login');
    } catch (error) {
      console.log('Error:', error.message);
      // Handle error, show error message to the user
    }
  };

  const handleGoogleAuth = async () => {
    console.log('Attempting Google sign-in...');
    try {
      const result = await signInWithPopup(auth, googleAuth);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) { //Checks if the user exists
        await setDoc(doc(db, "users", user.uid), {
          username: user.displayName,
          username: user.displayName,
          email: user.email,
          role: "Client"
        });
      }
      window.location.href = '/UserTestPage';
    } catch (error) {
      console.log(error);
    }
  };


  const handleGitHubAuth = async () => {
    console.log('Attempting GitHub sign-in...');
    try {
      const result = await signInWithPopup(auth, ghAuth);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) { //Checks if the user exists
        await setDoc(doc(db, "users", user.uid), {
          username: user.displayName,
          email: user.email,
          role: "Client"
        });
      }
      window.location.href = '/UserTestPage';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#F1F1F1',
      width: '100%',
      boxSizing: 'border-box', 
      overflowX: 'hidden' 
    }}>
      <h2 style={{ color: '#858585', fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px'
      }}>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="email" style={{ color: '#858585', width: '100px', marginRight: '10px', textAlign: 'right' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            style={{ flex: 1, color: 'black' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="email" style={{ color: '#858585', width: '100px', marginRight: '10px', textAlign: 'right' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ color: 'black' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="email" style={{ color: '#858585', width: '100px', marginRight: '10px', textAlign: 'right' }}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            style={{ color: 'black' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="email" style={{ color: '#858585', width: '100px', marginRight: '10px', textAlign: 'right' }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            style={{ color: 'black' }}
            required
          />
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <button type="submit" className="btn" style={{
            color: '#fff',
            backgroundColor: '#007bff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}>
            Sign Up
          </button>
        </div>
      </form>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '500px' }}>
        <button onClick={handleGoogleAuth} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Sign in with Google
        </button>
        <button onClick={handleGitHubAuth} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Sign in with Github
        </button>
      </div>
    </div>
  );
}

export default SignUp;
