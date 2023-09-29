import React, { useState } from "react";

import SignIn from "../../components/signIn/signIn.component";

import NetflixWordmark from "../../assets/netflix-wordmark.png";


import "./login.styles.css";

const LoginPage = () => {
    const [signIn, setSignIn] = useState(false);
    return (
        <div className="login">

            <div className="login_background">
                <img className="login_logo" src={NetflixWordmark} alt="Netflix Logo" />
                <button className="login_button" onClick={() => setSignIn(true)}>Sign In</button>
                <div className="login_gradient" />
            </div>

            {
                <div className="login_body">
                    {signIn ? <SignIn /> : (
                        <>
                            <h1>Unlimited films, TV programs and more.</h1>
                            <h2>Watch anywhere. Cancel at any time.</h2>
                            <h3>Ready to watch? Enter your email to create or restart your membership</h3>
                            <div className="login_input">
                                <form >
                                    <input type="email" placeholder="Email Address" name="" id="" />
                                    <button className="login_getStarted" onClick={() => setSignIn(true)}>
                                        GET STARTED
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            }

        </div>
    )
}

export default LoginPage;