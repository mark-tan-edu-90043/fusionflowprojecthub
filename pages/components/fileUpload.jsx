// FileUpload.js
import React, { useState } from 'react';
import { storage, db } from '../../_utils/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';


const FileUpload = ({ projectId, onClose }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };
  const handleUpload = async () => {
    try {
      const storageRef = ref(storage, `${projectId}/${fileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const fileURL = await getDownloadURL(storageRef)

      const docRef = await addDoc(collection(db, "projects", projectId, "files"), {
        name: fileName,
        url: fileURL,
      });

      alert('File uploaded successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  return (
    <main style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(231, 231, 231, 0.7)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      <div style={{
        padding: '40px',
        width: 400,
        height: 200,
        background: '#FFFFFF',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: '1',
        color: 'black'
      }}>
        <div style={{ display: 'flex', color: 'black', marginTop: '10px' }}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
          <button style={{
            backgroundColor: '#E3E3E3',
            color: '#929292',
            padding: '0 20px',
            height: '30px',
            borderRadius: '5px',
            fontSize: '16px',
            marginRight: '20px',
            height: '30px',
          }}
            onClick={() => onClose()}>Cancel</button>
          <button style={{
            height: '30px',
            padding: '0 20px',
            borderRadius: '5px',
            color: '#fff',
            fontSize: '16px',
            background: '#30b546',
          }} onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </main>
  );
};

export default FileUpload;
