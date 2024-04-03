// FileList.js
import React, { useState, useEffect } from 'react';
import { db, storage } from '../../_utils/firebase';
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import FileUpload from './fileUpload';


const FileList = ({ projectId}) => {
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
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const handleOpenUploadPopup = () => {
    setShowUploadPopup(true);
  };

  const handleCloseUploadPopup = () => {
    setShowUploadPopup(false);
  };

  return (
    <div >
      <div style={{ backgroundColor: '#E3E3E3', marginBottom: '5px', display:'flex', justifyContent:'space-between', }}>
        <h1 style={{alignContent:'center',display:'flex', margin:'0px 20px' }}>Files</h1>
        <button style={{
          width: '70px',
          height: '20px',
          color: '#fff',
          borderRadius: '4px',
          alignContent:'center',
          justifyContent:'flex-end',
          alignItems:'center',
          marginRight: '10px',
          fontSize:'12px',
          background: 'linear-gradient(to bottom, #30b546, #47FF66)',
          boxShadow: '0px 2px 1px #30b546',
          margin:'0px 20px'
        }} onClick={handleOpenUploadPopup}>Upload</button>
      </div>
      {showUploadPopup && (
                        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
                        <FileUpload projectId={projectId} onClose={handleCloseUploadPopup}/>   
                        </div>
                        )} 
      <div style={{ maxHeight: '110px', overflowY: 'auto' }}>  
        <table style={{ borderCollapse: 'collapse', width: '100%', alignContent:'center' }}>
          <tbody>
            {console.log(files)}
            {files.map((file, index) => (
              <tr key={file.fileId} style={{ borderBottom: '1px solid #ccc', color:'black' }}>
                {console.log(file.fileId)}
                <td style={{ padding: '5px 0' }}>
                  <span>{file.name}</span>
                </td>
                <td style={{ display: 'flex', justifyContent: 'flex-end', }}>
                
                  <button
                    onClick={() => handleDownload(file.url)}
                    style={{
                      backgroundColor: '#6B9EFF',
                      color: 'white',
                      border: 'none',

                      borderRadius: '5px',
                      marginRight: '10px',
                      textAlign: 'center',
                      lineHeight: '20px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                      width: '70px',
                      height: '30px',
                      fontSize:'12px'
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
                      fontSize:'12px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                      width: '70px',
                      height: '30px'
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
    </div>
  );
};

export default FileList;
