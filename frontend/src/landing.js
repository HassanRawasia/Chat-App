import React, { useState, useEffect, useRef } from "react";
import './landing.css';

const LandingPage = ({ toggle }) => {
    const [username, setUsername] = useState("");

    function handleChange(e) {
        setUsername(e.target.value);
      }

    return (
        <div className="background">
            <div className="box">
                <h2>Chat App</h2>
                <input value={username} onChange={handleChange} placeholder="Enter a username" className="username" autoFocus/>
                <input type="button" className="join" value="Join Chat" onClick={() => toggle(username)}/>
            </div>
        </div>
    )
}

export default LandingPage;