import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firebaseData, storage } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from '../plugins/Loader';

const Register = () => {

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const navigate = useNavigate();
    const [dataLoading, setDataLoading] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        setDataLoading(true);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

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
                        await updateProfile(res.user, {
                            displayName: displayName,
                            photoURL: downloadURL
                        })

                        await setDoc(doc(firebaseData, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(firebaseData, "userChats", res.user.uid), {});
                        setDataLoading(false)
                        navigate('/home')
                    });
                }
            );
        } catch (err) {
            setErr(true);
            setErrMsg(err.message);
            setDataLoading(false);
        }

    }

    return (
        <>
            {dataLoading ? (
                <Loading bgc={"#7763fa"} />
            ) : (
                <div className='formContainer'>
                    <div className='formWrapper'>
                        <span className='logo'>Curiosity Messenger</span>
                        <span className='title'>Register</span>
                        <form onSubmit={handleSubmit}>
                            <input type='text' placeholder='User Name' />
                            <input type='email' placeholder='Email' />
                            <input type='password' placeholder='Password' />
                            <input style={{ display: "none" }} type='file' id='userPic' />
                            <label htmlFor='userPic'>
                                <img src='/img/profile-blank.jpg' alt='profile-blank' />
                                <span>Add an avatar</span>
                            </label>
                            <button>Sign up</button>
                            {err && <span className='err'>{errMsg}</span>}
                        </form>
                        <p>You do have an account? <Link className='link' to='/'>Login</Link></p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Register