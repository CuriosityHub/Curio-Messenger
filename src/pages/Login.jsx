import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';
import Loading from '../plugins/Loader';

const Login = () => {

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const navigate = useNavigate();
    const [dataLoading, setDataLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        setDataLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setDataLoading(false)
            navigate('/home');
        } catch (err) {
            setErr(true);
            setErrMsg(err.messages)
            setDataLoading(false)
        }

    }

    return (
        <>
            {dataLoading ? (
                <Loading bgc={"#7763fa"}/>
            ) : (
                <div className='formContainer'>
                    <div className='formWrapper'>
                        <span className='logo'>Curiosity Messenger</span>
                        <span className='title'>Login</span>
                        <form onSubmit={handleSubmit}>
                            <input type='email' placeholder='email' />
                            <input type='password' placeholder='password' />
                            <button>Sign In</button>
                            {err && <div className='err'>{errMsg}</div>}
                        </form>
                        <p>You don't have an account? <Link className='link' to="/signup" >Register</Link></p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login;