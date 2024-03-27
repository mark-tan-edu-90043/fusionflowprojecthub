// FileUpload.js
import React, { useState } from 'react';
import { storage, db } from '../../_utils/firebase';
import { getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const FileUpload = ({ projectId }) => {
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
    <div style={{display:'flex', color: 'black', marginTop:'10px'}}>
      <input type="file" onChange={handleFileChange} />
      <button style={{
            height: '30px',
            padding: '0 20px',
            borderRadius: '5px',
            color: '#fff',
            fontSize: '12px',
            background: '#30b546',
            boxSizing: 'border-box',
            
          }} onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
