import React from 'react';
import { db } from '../_utils/firebase'; // Importing Firebase database instance
import { collection, getDocs, updateDoc } from 'firebase/firestore';

const UpdateUsers = () => {
  const updateUsers = async () => {
    try {
      // Get a reference to the users collection
      const usersCollection = collection(db, 'users');

      // Retrieve all users
      const snapshot = await getDocs(usersCollection);
      snapshot.forEach(async (doc) => {
        // Check if the user document has a name field
        if (true) {
          await updateDoc(doc.ref, {
            status: 'Active'
          });
            console.log('made thing uppercase');
        }
        if (!doc.data().username) {
            // Update the user document's name to 'No name'
            await updateDoc(doc.ref, {
              username: 'No username'
            });
            console.log(`Updated username for user ${doc.id}`);
          }
      });

      
    } catch (error) {
      console.error('Error updating users:', error);
    }
  };

  return (
    <div>
      <h1>Update Users</h1>
      <button onClick={updateUsers}>Update Users</button>
    </div>
  );
};

export default UpdateUsers;
