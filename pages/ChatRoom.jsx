// ChatRoom.jsx

import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../../_utils/firebase";

export default function ChatRoom({ projectId, userType, userId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const messagesQuery = query(
            collection(db, "messages"),
            where("projectId", "==", projectId),
            orderBy("timestamp")
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(data);
        });

        return () => unsubscribe();
    }, [projectId]);

    const sendMessage = async () => {
        if (newMessage.trim() === "") return;

        try {
            await addDoc(collection(db, "messages"), {
                projectId,
                senderId: userId,
                userType,
                message: newMessage,
                timestamp: new Date(),
            });
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    return (
        <div>
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        <strong>{message.userType}: </strong>
                        {message.message}
                    </div>
                ))}
            </div>
            <div>
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
