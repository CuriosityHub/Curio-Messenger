import React, { useContext, useState } from 'react';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { firebaseData } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';

const Search = () => {

  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(firebaseData, "users"),
      where("displayName", "==", userName)
    );

    console.log('trs');

    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
        console.log(user);
        console.log('ree');
      });
      // console.log(user);
    } catch (err) {
      setErr(true)
    }
  }
  const handleKey = e => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

    try {
      const res = await getDoc(doc(firebaseData, "chats", combinedId));
      console.log(res);
      if (!res.exists()) {
        await setDoc(doc(firebaseData, "chats", combinedId), { messages: [] });
        await updateDoc(doc(firebaseData, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })
        await updateDoc(doc(firebaseData, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      };
    } catch (err) {
      console.log(err.message);
    }
    setUser(null);
    setUserName("");
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input
          type="text"
          placeholder='Enter to search'
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {err && <span>User Not Found</span>}
      {user &&
        <div className='userChat' onClick={handleSelect}>
          <img src={user.photoURL} alt='' />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      }
    </div>
  )
}

export default Search