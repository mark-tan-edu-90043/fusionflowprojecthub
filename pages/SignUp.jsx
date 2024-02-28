import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth, googleAuth, ghAuth } from "../_utils/firebase"

import { useUserAuth } from '../_utils/auth-context';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleGoogleAuth = () => {
    console.log('Attempting Google sign-in...');
    signInWithPopup(auth, googleAuth)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      });
  }

  const handleGitHubAuth = () => {
    console.log('Atteming Github Sign-in...');
    signInWithPopup(auth, ghAuth);
  }

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" style={{color: 'black'}}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            style={{color: 'black'}}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" style={{color: 'black'}}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            style={{color: 'black'}}
            required
          />
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>

      <button style={{ position: 'absolute', bottom: '70px', left: '20px',backgroundColor: '#007bff',color: '#fff',padding: '10px 20px',border: 'none',borderRadius: '5px' ,cursor: 'pointer',}} onClick={handleGoogleAuth}>Sign in with Google</button> 
      <button style={{ position: 'absolute', bottom: '70px', left: '500px',backgroundColor: '#007bff',color: '#fff',padding: '10px 20px',border: 'none',borderRadius: '5px' ,cursor: 'pointer',}} onClick={handleGitHubAuth}>Sign in with Github</button>

    
    </div>
  );
}

export default SignUp;
