import React from 'react'
import { useState } from 'react';
import './Login.css';
import { auth } from './firebase';
import { login } from './features/userSlice';
import { useDispatch } from 'react-redux';

function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const register = () => {
        if (!name)
            return alert("Please enter a full name!");

        auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
                userAuth.user.updateProfile({
                    displayName: name,
                })
                    .then(() => {
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName: name,

                        }))
                    })
            }).catch((error) => alert(error))
    }

    const loginToApp = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((userAuth) => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName
                }))
            }).catch(error => alert(error))
    }

    return (
        <div className="login">
            <form>
                <input onChange={e => setName(e.target.value)} value={name} placeholder="Full  name required if registering" type="text" />
                <input onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" type="email" />
                <input onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" type="password" />
                <button type="submit" onClick={loginToApp}>Sign In</button>
            </form>
            <p>Not a member?
                <span className="login__register" onClick={register}>Register Now</span>
            </p>
        </div>
    )
}

export default Login
