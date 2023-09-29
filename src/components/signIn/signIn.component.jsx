import React, { useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from "../../utils/firebase.utils";

import "./signIn.styles.css";

const SignIn = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [signIn, setSignIn] = useState(true);

    const signup = async (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
            .then(() => {
                toast.success('Sign Up successfully');
            })
            .catch(err => {
                toast.error("The email address is already in use by another account");
            });
    }

    const signin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
            .then(() => {
                toast.success('Sign In successfully');
            })
            .catch(err => {
                toast.error("Invalid Login Credentials");
            });
    }

    return (
        <div className="signIn">
            <form onSubmit={signIn ? signin : signup} >
                <h1>{signIn ? "Sign In" : "Sign Up"}</h1>
                <input ref={emailRef} type="email" placeholder="Email" required />
                <input ref={passwordRef} type="password" placeholder="Password" required />
                <button type="submit">{signIn ? "Sign In" : "Sign Up"}</button>
                {
                    signIn ? (
                        <h4>
                            <span className="signUp_gray">New to Netflix? </span>
                            <span className="signUp_link" onClick={() => setSignIn(false)}>
                                Sign Up now.
                            </span>
                        </h4>
                    ) : (
                        <span className="signIn_link" onClick={() => setSignIn(true)}>
                            Sign In.
                        </span>
                    )
                }
            </form>
            <ToastContainer
                position="top-center"
                pauseOnHover={true}
                transition={Bounce}
                closeOnClick={true}
                theme="dark"
            />
        </div>
    )
}

export default SignIn;
