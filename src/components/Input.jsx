import React, { useContext, useState } from 'react';
import { IoMdAttach } from 'react-icons/io';
import { BiImageAdd } from 'react-icons/bi';
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firebaseData, storage } from '../firebase/config';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {

  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext);
  const [err, setErr] = useState(false)

  const handleSend = async () => {

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default: return;
          }
        },
        (error) => {
          setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(firebaseData, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              })
            })
          });
        }
      );
    } else {
      await updateDoc(doc(firebaseData, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }

    await updateDoc(doc(firebaseData, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    })
    await updateDoc(doc(firebaseData, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    setText("");
    setImg(null)
  }
  return (
    <div className='input'>
      <input type='text' placeholder='Enter Something...' onChange={e => setText(e.target.value)} value={text} />
      <div className='send'>
        <IoMdAttach className='icon' />
        <input type='file' style={{ display: 'none' }} id='file' onChange={e => setImg(e.target.files[0])} />
        <BiImageAdd className='icon' />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input