import React, { useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleSignIn = (e) => {
        e.preventDefault(); 
        
    }

    const login=event=>{
        event.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then((auth)=>{
            history.push("/");

        })
        .catch(e=>alert(e.message))
    };
    const register=event=>{
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .then(auth=>{
            history.push("/");


        })
        .catch((e)=>alert(e.message));
    }
   
    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                    alt="Amazon Logo"
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form onSubmit={handleSignIn}>
                    <h5>E-mail</h5>
                    <input type='email' value={email} onChange={event => setEmail(event.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={event => setPassword(event.target.value)} />

                    <button onClick={login} type='submit' className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <Link to="/registration">
                    <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
                </Link>
            </div>
        </div>
    )
}

export default Login;
