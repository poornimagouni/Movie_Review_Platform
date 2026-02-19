import React, { useState } from "react";

const Login = ({ setUser }) => {
  const [isSignup, setIsSignup] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (isSignup) {
      // Signup validation
      if (!firstName || !lastName || !email || !password) {
        alert("Please fill all fields");
        return;
      }

      // Set full name as username
      setUser(firstName + " " + lastName);
    } else {
      // Login validation
      if (!email || !password) {
        alert("Please enter email and password");
        return;
      }

      setUser(email.split("@")[0]);
    }
  };

  return (
    <div className="login-container">

      {/* Title Outside */}
      <h1 className="login-title">🎬 Movie Review Platform</h1>
      <h3 className="login-subtitle">
        {isSignup
          ? "Create your account"
          : "Welcome back to Movie Review Platform"}
      </h3>

      <div className="login-box">

        {/* Show extra fields only in Signup */}
        {isSignup && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {/* Toggle Option */}
        <p
          style={{
            cursor: "pointer",
            fontSize: "14px",
            color: "#bbb"
          }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </p>

        <button
          className="skip-btn"
          onClick={() => setUser("GuestUser")}
        >
          Skip
        </button>

      </div>
    </div>
  );
};

export default Login;
