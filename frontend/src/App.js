import React, { useState, useEffect, useRef } from "react";
import './App.css';
import LandingPage from './landing';
import Send from './send-two.png';
import io from "socket.io-client";

const App = () => {
  const [landing, setLanding] = useState(true);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ref = useRef();

  useEffect(() => {
    ref.current = io.connect('http://127.0.0.1:8000/');

    ref.current.on("user id", (id) => {
      setUserId(id);
      console.log(id);
    });

    ref.current.on("message", (message) => {
      receivedMessage(message);
    })
  }, [])

  function receivedMessage(message) {
    setMessages(oldMessages => [...oldMessages, message]);
  }

  function sendMessage(event) {
    event.preventDefault();
    const newMessage = {
      body: message,
      id: userId,
    };
    setMessage("");
    ref.current.emit("message sent", newMessage);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function togglePage(newUsername) {
    setUsername(newUsername);
    setLanding(!landing);
  }

  // Conditionally render Landing page and chatting page
  if (landing) {
    return (
      <LandingPage toggle={(newUsername) => togglePage(newUsername)} />
    )
  }
  if (!landing) {
    return (
      <div className="App">
        <div className="header">Chat App</div>
        <div className="layout">
          <div className="sidebar">
            You are signed in as {username} <br />
            <h6>(ID: {userId})</h6>
          </div>
          <div className="message-container">
            {messages.map((message, index) => {
              if (message.id === userId) {
                return (
                  <div className="your-row" key={index}>
                    <div className="user-label">{username}
                      <div className="your-message">
                        {message.body}
                      </div>
                    </div>
                  </div>
                )
              }
              return (
                <div className="other-row" key={index}>
                  <div className="other-message">
                    {message.body}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="footer">
          <div className="tag" />
          <form onSubmit={sendMessage}>
            <input value={message} onChange={handleChange} placeholder="Type a message" className="textbox" autoFocus />
            <input type="image" src={Send} alt="Send" value="Send" className="send" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
