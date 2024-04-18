import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuth, ghAuth, db } from "../_utils/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/router';

function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Client');
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

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  }

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

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
        role: role,
        dob: getCurrentDate(),
        status: 'Active'
      });

      router.push('Admin/Home')

    } catch (error) {
      console.log('Error:', error.message);
      // Handle error, show error message to the user
    }
  };

  return (
    <div style={{
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
      <h2 style={{ color: '#858585', fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>New User</h2>
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
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label htmlFor="email" style={{ color: '#858585', width: '100px', marginRight: '10px', textAlign: 'right' }}>Role:</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={handleRoleChange}
            style={{ color: 'black' }}
            required
          >
            <option value="Client">Client</option>
            <option value="Developer">Developer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div style={{ width: '80%', display: 'flex', justifyContent: 'space-around' }}>
          <button onClick={() => router.push('/Admin/Home')}
            style={{
              color: '#fff',
              backgroundColor: '#007bff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
              marginLeft: '30px'
            }}>
            Back
          </button>
          <button type="submit" className="btn"
            style={{
              color: '#fff',
              backgroundColor: '#007bff',
              padding: '10px 12px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
            }}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
