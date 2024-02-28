import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuth, ghAuth, db } from "../_utils/firebase";
import { doc, setDoc } from "firebase/firestore"; 

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user information in Firestore
      await setDoc(doc(db, "users", user.uid),{
        email: email,
        username: username,
      });

      setSuccessMessage('Sign up successful! You will be redirected to the login page shortly.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear success message after 3 seconds
      window.location.href = '/';
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
      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName,
        email: user.email
      });
      // Redirect to ClientView or perform any other action
      window.location.href = '/ClientView';
    } catch (error) {
      console.log('Google sign-in error:', error.message);
      // Handle Google sign-in error
    }
  }
  

  const handleGitHubAuth = async () => {
    console.log('Attempting GitHub sign-in...');
    try {
      const result = await signInWithPopup(auth, ghAuth);
      const user = result.user;
      // Use user's UID as username
      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName,
        email: user.email
      });
      // Redirect to ClientView or perform any other action
      window.location.href = '/ClientView';
    } catch (error) {
      console.log('GitHub sign-in error:', error.message);
      // Handle GitHub sign-in error
    }
  }
  

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
