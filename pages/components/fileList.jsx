// FileList.js
import React, { useState, useEffect } from 'react';
import { db, storage } from '../../_utils/firebase';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const FileList = ({ projectId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        console.log('Attempting to fetch files...');
        const filesSnapshot = await getDocs(collection(db, "projects", projectId, "files"));
        const filesData = filesSnapshot.docs.map(doc => ({ fileId: doc.id, ...doc.data() }));
        console.log('Fetched files:', filesData); // Add this line for debugging
        setFiles(filesData);
      } catch (error) {
        console.log('Error fetching files:', error);
      }
    };    
  
    fetchFiles();
  }, [projectId]);  

  const handleDownload = (url) => {
    // Implement file download logic
    window.open(url, '_blank');
  };
  
  const handleDelete = async (url, fileId) => {
    try {
      const storageRef = ref(storage, url);
      const pathRef = doc(db, "projects", projectId, "files", fileId);
  
      await deleteObject(storageRef);
      await deleteDoc(pathRef); 
      setFiles(prevFiles => prevFiles.filter(file => file.url !== url));
      console.log('File deleted successfully!');
      console.log('Filepath removed from database');
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };
  

  return (
    <div style={{}}>
    <h3 style={{ backgroundColor: '#E3E3E3',  marginBottom: '5px', marginTop:'1px'}}>Files</h3>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
    <tbody>
      {console.log(files)}
      {files.map((file, index) => (
        <tr key={file.fileId} style={{ borderBottom: '1px solid #ccc' }}>
          {console.log(file.fileId)}
          <td style={{ padding: '10px 0' }}>
            <span>{file.name}</span>
          </td>
          <td style={{display:'flex', justifyContent:'flex-end' }}>
            <button
              onClick={() => handleDownload(file.url)}
              style={{
                backgroundColor: '#6B9EFF',
                color: 'white',
                border: 'none',
                
                borderRadius: '5px',
                marginRight: '10px',
                textAlign:'center',
                lineHeight: '20px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                width:'100px',
                height:'40px' 
              }}
            >
              Download
            </button>
            <button
              onClick={() => handleDelete(file.url, file.fileId)}
              style={{
                backgroundColor: '#EB465A',
                color: 'white',
                border: 'none',
                
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                width:'100px',
                height:'40px'
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
    </table>
  </div>
  );
};

export default FileList;
