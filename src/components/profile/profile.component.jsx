import React from "react";
import { useSelector } from "react-redux";

import Navbar from "../navbar/navbar.component";
import Plans from "../plans/plans.component";

import { selectUser } from "../../redux/user/userSlice";
import { auth } from "../../utils/firebase.utils";
import NetflixAvatar from "../../assets/Netflix.png";

import "./profile.styles.css";

const Profile = () => {
    const user = useSelector(selectUser);

    return (
        <div className="profile">
            <Navbar />
            <div className="profile_body">

                <h1>Edit Profile</h1>

                <div className="profile_info">
                    <img src={NetflixAvatar} alt="Profile Avatar" />

                    <div className="profile_details">
                        <h2>{user.email}</h2>
                        <div className="profile_plans">
                            <h3>Plans</h3>
                            <Plans />
                            <button onClick={() => auth.signOut()} className="profile_signout">
                                Sign Out
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile;