import Image from "next/image";
import { useState, useEffect } from "react";
import { getDocs, setDoc, doc, deleteDoc, collection, query, or, where, updateDoc } from "firebase/firestore";
import { db, auth } from "../../_utils/firebase"
import React from 'react';
import png1 from '@/public/1.png'
import png2 from '@/public/2.png'
import png3 from '@/public/3.png'
import { useRouter } from "next/router";
export default function EditProject({ handleClose, project, projectId, deleteProject }) {

  const router = useRouter();
  const [user, setUser] = useState();
  const [developers, setDevelopers] = useState([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [formData, setFormData] = useState({
    name: project ? project.name || '' : '',
    clientCompany: project ? project.clientCompany || '' : '',
    description: project ? project.description || '' : '',
    developers: project ? project.developers || [] : [],
    clients: project ? project.clients || [] : [],

  });

  useEffect(() => {   //Grabs user data
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null); // No user signed in
      }
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    getDevelopers();
    getClients();
    console.log(project);
    if (project.developers) {
      setSelectedDevelopers(project.developers)
    }
    if (project.clients) {
      setSelectedClients(project.clients)
    }
    console.log(project.clients)
    console.log(project.developers)

  }, []);

  const handleTitleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
    console.log(formData);
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
    console.log(formData);
  };

  const handleClientCompanyChange = (e) => {
    setFormData({ ...formData, clientCompany: e.target.value });
    console.log(formData);
  };

  const handleProgressChange = (event) => {

    const newPercentage = Math.max(0, Math.min(100, Number(event.target.value)));
    setPercentage(newPercentage);
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
    console.log(selectedDevelopers);
  };

  const getClients = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => {
        const userData = doc.data();
        userData.uid = doc.id;
        return userData;
      });
      setClients(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  const handleClientChange = (e) => {
    const selectedClientIds = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedClients(selectedClientIds);
    console.log(selectedClients)
  };

  const handleSubmit = async () => {
    try {
      await updateDoc(doc(db, 'projects', projectId), {
        name: formData.name,
        description: formData.description,
        clientCompany: formData.clientCompany,
        developers: selectedDevelopers,
        clients: selectedClients,
        progress: percentage,
      });
      console.log('Updated project', projectId);
      handleClose();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure? All data related to the project will be deleted. \n\nTHIS ACTION IS IRREVERSIBLE.")) {
      if (confirm("Are you absolutely sure? This will remove all developers from the project and your shared files will be inaccessible")) {
        try {
          const taskRef = doc(db, "projects", projectId);
          await deleteDoc(taskRef);
          alert("Project deleted... \nRedirecting...");
          router.push("../Developer/Home");
        } catch (error) {
          console.error("Failed to delete document:", error)
        }
      };
    };
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
        width: '517px',
        height: '600px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '30px 20px 0 30px',
      }}>
        <div style={{ color: '#929292', marginBottom: '2px' }}>Project Title</div>
        <input type="text" placeholder="Your Project Title here" style={{
          width: '260px',
          height: '30px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          fontSize: '12px',
          paddingLeft: '5px',
          marginBottom: '5px'
        }}
          value={formData.name}
          onChange={handleTitleChange} />

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <input type="text" placeholder="Client Company" style={{
            width: '260px',
            height: '30px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '12px',
            paddingLeft: '5px',

          }} value={formData.clientCompany}
            onChange={handleClientCompanyChange} />
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
        { /*
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
        */}
        <div style={{ color: '#929292', marginBottom: '2px' }}>Description</div>
        <div style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            // borderBottom: '1px solid #ccc',
            // padding: '5px 0',
          }}>
            {/* <span style={{ padding: '0 8px' }}>Aa</span>
            <b style={{ padding: '0 8px' }}>B</b>
            <i style={{ padding: '0 8px' }}>I</i>
            <span style={{ textDecoration: "underline", padding: '0 8px' }}>U</span>
            <del style={{ padding: '0 8px' }}>S</del>
            <span style={{ padding: '0 8px' }}>H1</span>
            <span style={{ padding: '0 8px' }} >H2</span>
            <span style={{ padding: '0 8px' }}>H3</span> */}
          </div>
          <textarea style={{ resize: 'none', width: '100%', height: '100%' }} value={formData.description}
            onChange={handleDescriptionChange} ></textarea>
        </div>
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
        </div>
        <div>
          <div style={{ display: 'flex' }}>
            <div>
              <h2 style={{ color: '#929292' }}>Select Developers:</h2>
              <select multiple onChange={handleDeveloperChange} style={{ marginRight: '20px', color: '#929292', border: '1px solid #ccc', borderRadius: '3px' }}>
                {developers.map((developer) => (
                  <option key={developer.uid} value={developer.uid}>
                    {developer.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h2 style={{ color: '#929292' }}>Selected Developers:</h2>
              <ul style={{ maxHeight: '75px', overflow: 'auto' }}>
                {selectedDevelopers.map((developerId) => (
                  <li style={{ color: '#929292' }} key={developerId}>
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
          marginTop: '8px',

        }}>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginTop: '5px' }}>
            <h2 style={{ color: '#929292' }}>Select Clients:</h2>
            <select multiple onChange={handleClientChange} style={{ marginRight: '20px', color: '#929292', marginBottom: '8px', border: '1px solid #ccc', borderRadius: '3px' }}>
              {clients.map((client) => (
                <option key={client.uid} value={client.uid}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2 style={{ color: '#929292', marginTop: '5px' }}>Selected Clients:</h2>
            <ul style={{ maxHeight: '90px', overflowY: 'auto' }}>
              {selectedClients.map((clientId) => (
                <li style={{ color: '#929292' }} key={clientId}>
                  {clients.find((client) => client.uid === clientId)?.name}
                </li>
              ))}
            </ul>
          </div>

        </div>
        {/* progress bar */}
        <div>
          <div style={{ color: '#929292' }}>Project Progress</div>
          <input
            type="range"
            value={percentage}
            onChange={handleProgressChange}
            min="0"
            max="100"
          />
          <input
            type="number"
            value={percentage}
            onChange={handleProgressChange}
            min="0"
            max="100"
          />
        </div>
        {/* button         */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button style={{
            height: '30px',
            padding: '5px 20px',
            borderRadius: '5px',
            color: '#fff',
            fontSize: '12px',
            marginRight: '20px',
            background: '#EB465A',
            boxSizing: 'border-box',
            boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.5)',
          }} onClick={handleDelete}>Delete</button>
          <button style={{
            height: '30px',
            padding: '5px 20px',
            borderRadius: '5px',
            marginRight: '20px',
            color: '#929292',
            fontSize: '12px',
            background: '#E3E3E3',
            boxSizing: 'border-box',
            boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.5)',

          }} onClick={handleClose}>Cancel</button>
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