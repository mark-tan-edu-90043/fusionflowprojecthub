import Image from "next/image";
import { useState, useEffect } from "react";
import { getDocs, setDoc, doc, addDoc, collection, query, or, where } from "firebase/firestore";
import { db, auth } from "../../_utils/firebase"
import React from 'react';
import png1 from '@/public/1.png'
import png2 from '@/public/2.png'
import png3 from '@/public/3.png'
export default function Popups({ handleClose }) {

  const [user, setUser] = useState();
  const [developers, setDevelopers] = useState([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    clientCompany: "",
    description: "",
    developers: [],
    clientUsers:[]
  });

  useEffect(() => {   //Grabs user data
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
            setUser(currentUser);
            console.log("Should work");
        } else {
            setUser(null); // No user signed in
        }
    });
    return () => unsubscribe();
}, [user]);

useEffect(() => {
    getDevelopers();
}, []);

  const handleTitleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
    console.log(formData);
  };

  const handleClientChange = (e) => {
    setFormData({ ...formData, clientCompany: e.target.value });
    console.log(formData);
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
    console.log(formData);
  };

  const getDevelopers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, or(where('role', '==', 'Developer'), where('role', '==', 'Admin')));
  
      const usersSnapshot = await getDocs(q);
      const usersData = usersSnapshot.docs.map((doc) => {
        const userData = doc.data();
        userData.uid = doc.id;
        return userData;
      });
      setDevelopers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  const handleDeveloperChange = (e) => {
    const selectedDeveloperIds = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedDevelopers(selectedDeveloperIds);
  };

  const handleSubmit = async () => {
    try {
      const projRef = await addDoc(collection(db, 'projects'), {
        name: formData.name,
        description: formData.description,
        clientCompany: formData.clientCompany,
        developers: [...selectedDevelopers, user.uid],
      });
      console.log('New project added with ID: ', projRef.id);
      setFormData({
        name: '',
        description: '',
        clientCompany: '',
      });
      handleClose();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };


  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 1)',
      color: 'black'
    }}>
      <div style={{
        position: 'relative',
        width: '400px',
        height: '550px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '30px 20px 0 30px',
      }}>
        <div style={{ color: '#929292', marginBottom: '5px' }}>Project Title</div>
        <input type="text" placeholder="Your Project Title here" style={{
            width: '260px',
            height: '30px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '12px',
            paddingLeft: '5px',
          }}        
          value={formData.title} 
          onChange={handleTitleChange}  />
        
        {/* <div style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          width: '20px',
          height: '20px',
          backgroundColor: '#fff',
          color: '#ccc',
          border: '1px solid #ccc',
          textAlign: 'center',
          lineHeight: '20px',
          borderRadius: '50%',
          fontSize: '12px',
          cursor: 'pointer'
        }} onClick={handleClose}>X</div> */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input type="text" placeholder="Client Company" style={{
            width: '260px',
            height: '30px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '12px',
            paddingLeft: '5px',
          }}           value={formData.clientCompany} 
          onChange={handleClientChange} />
          <button style={{
            height: '30px',
            padding: '0 20px',
            borderRadius: '5px',
            color: '#fff',
            fontSize: '12px',
            background: '#30b546',
            boxSizing: 'border-box',
            boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.5)',
          }}>Create</button>
        </div>
        <div style={{ marginTop: '5px', border: '1px solid #ccc', width: '260px', paddingLeft: '5px', borderRadius: '5px', fontSize: '12px', color: '#ccc' }}>
          <div style={{
            padding: '5px 0', display: 'flex', alignItems: 'center'
          }}>
            <Image width={10} height={10} src={png1}></Image>
            <span style={{ marginLeft: '2px' }}>Coogle inc. Calgary branch</span>
          </div>
          <div style={{
            padding: '5px 0', display: 'flex', alignItems: 'center'
          }}>
            <Image width={10} height={10} src={png2}></Image>
            <span style={{ marginLeft: '2px' }}>a Apple Inc. Manitoba branch Client center</span>
          </div>
          <div style={{
            padding: '5px 0', display: 'flex', alignItems: 'center'
          }}>
            <Image width={10} height={10} src={png3}></Image>
            <span style={{ marginLeft: '2px' }}>Amazon SAlT distribute potint</span>
          </div>
        </div>
        <div style={{ color: '#929292', marginBottom: '5px' }}>Description</div>
        <div style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            borderBottom: '1px solid #ccc',
            padding: '5px 0',
          }}>
            <span style={{ padding: '0 8px' }}>Aa</span>
            <b style={{ padding: '0 8px' }}>B</b>
            <i style={{ padding: '0 8px' }}>I</i>
            <span style={{ textDecoration: "underline", padding: '0 8px' }}>U</span>
            <del style={{ padding: '0 8px' }}>S</del>
            <span style={{ padding: '0 8px' }}>H1</span>
            <span style={{ padding: '0 8px' }} >H2</span>
            <span style={{ padding: '0 8px' }}>H3</span>
          </div>
          <textarea style={{ resize: 'none', width: '100%', height: '100%' }} value={formData.description} 
          onChange={handleDescriptionChange} ></textarea>
        </div>
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
        </div>
        <div> 
    <div style={{ display: 'flex' }}>
      <div>
        <h2 style={{color:'#929292'}}>Select Developers:</h2>
        <select multiple onChange={handleDeveloperChange} style={{ marginRight: '20px',color:'#929292' }}>
          {developers.map((developer) => (
            <option key={developer.uid} value={developer.uid}>
              {developer.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2 style={{color:'#929292'}}>Selected Developers:</h2>
        <ul>
          {selectedDevelopers.map((developerId) => (
            <li style={{color:'#929292'}}key={developerId}>
              {developers.find((developer) => developer.uid === developerId)?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '4px',
          
        }}>
        </div>

        <div style={{ marginTop: '8px' }}>
          <input type="text" placeholder="Add client users" style={{
            width: '100%',
            height: '40px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '12px',
            paddingLeft: '5px',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '8px',  }}>
        <button style={{
            height: '30px',
            padding: '5px 20px',
            borderRadius: '5px',
            marginRight:'20px',
            color: '#929292',
            fontSize: '12px',
            background: '#E3E3E3',
            boxSizing: 'border-box',
            boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.5)',
          }} onClick={handleClose}>Cancle</button>
          <button style={{
            height: '30px',
            padding: '5px 20px',
            borderRadius: '5px',
            color: '#fff',
            fontSize: '12px',
            background: '#3C89FC',
            boxSizing: 'border-box',
            boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.5)',
          }} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </main>
  );
}