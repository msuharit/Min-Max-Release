import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth methods
import { initializeApp } from 'firebase/app'
import './LoginSignup.css';
import logo_icon from './assets/logo.png';
import user_icon from './assets/person.png';
import email_icon from './assets/email.png';
import password_icon from './assets/password.png';
import {
  Link
} from 'react-router-dom';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyD3BMBI9I9Jj6QUvQkyh9quttuLWbFUbRQ",
  authDomain: "min-max-list.firebaseapp.com",
  projectId: "min-max-list",
  storageBucket: "min-max-list.firebasestorage.app",
  messagingSenderId: "267782539417",
  appId: "1:267782539417:web:5c9472ec0748142639d008",
  measurementId: "G-8KSRE4VHQ1"
})


const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const placeholderStyle = { color: "#000" };
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  const handleSubmit = () => {
    if (action === "Login") {
      // Firebase login with email and password
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in successfully, navigate to TodoPage
          navigate('/TodoPage');
        })
        .catch((error) => {
          console.error("Login error:", error.message);
        });
    } else {
      // Firebase sign-up with email and password
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Account created successfully, navigate to TodoPage or another page
          navigate('/TodoPage');
        })
        .catch((error) => {
          console.error("Sign-up error:", error.message);
        });
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <img src={logo_icon} alt="" />
        <div className='text'>{action}</div>
      </div>
      <div className='inputs'>
        {action === "Login" ? (
          <div className='input'>
            <img src={email_icon} alt="" />
            <input
              type="text"
              placeholder="Email"
              style={placeholderStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          <>
            <div className='input'>
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Username..."
                style={placeholderStyle}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='input'>
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Email..."
                style={placeholderStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        )}
        <div className='input'>
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      <div className="submit-container">
        <div
          className={action === "Sign Up" ? "sign-up-submit" : "login-submit"}
          onClick={handleSubmit}
        >
          {action}
        </div>
      </div>
      </div>

      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Forgot Password? <div className='underline'></div>
        </div>
      )}
      {action === "Sign Up" ? (
        <div className="login-switch" onClick={() => setAction("Login")}>
          Already have an account?<div className='underline-login-switch'></div>
        </div>
      ) : (
        <div className="sign-up-switch" onClick={() => setAction("Sign Up")}>
          Don't have an account? <div className='underline-sign-up-switch'></div>
        </div>
      )}
      {/* Button to navigate to TodoList page */}
      <div className="todo-list-button">
        <Link to="/TodoPage">
          <button className="todolist-button">TodoPage</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginSignup;
