import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import NetflixLogo from "../../assets/netflix-wordmark.png";
import NetflixAvatar from "../../assets/Netflix.png";

import "./navbar.styles.css";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, [])

    return (
        <div className={`navbar ${show && 'nav_black'}`}>
            <div className="nav_contents">

                <img onClick={() => navigate("/")} className="nav_logo"
                    src={NetflixLogo} alt="Netflix Logo" />

                <img onClick={() => navigate("/profile")} className="nav_avatar"
                    src={NetflixAvatar} alt="Profile Avatar" />

            </div>
        </div>
    )
}

export default Navbar;