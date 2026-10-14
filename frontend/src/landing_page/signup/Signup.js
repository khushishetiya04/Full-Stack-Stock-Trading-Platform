// import React from "react";

// function Signup() {
//   return <h1>Signup</h1>;
// }

// export default Signup;



import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      alert(response.data.message);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create an Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

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
            minLength={8}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
