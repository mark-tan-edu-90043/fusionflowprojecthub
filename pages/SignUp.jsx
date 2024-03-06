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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user information in Firestore
      await setDoc(doc(db, "users", user.uid),{
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
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" style={{ color: 'white' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            style={{ color: 'black' }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{ color: 'white' }}>Password:</label>
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
        <div className="form-group">
          <label htmlFor="username" style={{ color: 'white' }}>Username:</label>
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
        <div className="form-group">
          <label htmlFor="name" style={{ color: 'white' }}>Name:</label>
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
        <button type="submit" className="btn">Sign Up</button>
      </form>
      {successMessage && (
        <div className="success-message">   
          {successMessage}
        </div>
      )}
      <button style={{ position: 'absolute', bottom: '70px', left: '20px', backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', }} onClick={handleGoogleAuth}>Sign in with Google</button>
      <button style={{ position: 'absolute', bottom: '70px', left: '500px', backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', }} onClick={handleGitHubAuth}>Sign in with Github</button>
    </div>
  );
}

export default SignUp;
