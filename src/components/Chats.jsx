import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { firebaseData } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { StyleContext } from '../context/StyleContext';

const Chats = () => {

  const [chats, setChats] = useState();

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { handleChatRes } = useContext(StyleContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(firebaseData, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });

      return () => {
        unsub();
      }
    };

    currentUser.uid && getChats()
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u })
    document.querySelector(`.sidebar`, {
      display: "none"
    })
    handleChatRes();
  }

  return (
    <div className='chats'>
      {chats && Object.entries(chats)?.sort((a, b) => {
        return b[1].date - a[1].date
      }).map((chat) => (
        <div className='userChat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt='img' />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats