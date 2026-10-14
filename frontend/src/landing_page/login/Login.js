import React, { useState } from "react";
import axios from "axios";

import { useAuth } from "../../AuthContext";

function Login() {
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      setUser(response.data.user);
      window.location.href = "http://localhost:3001";

      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login to Your Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
