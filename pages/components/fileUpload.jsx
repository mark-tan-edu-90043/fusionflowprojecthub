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
    <div style={{color: 'black'}}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
