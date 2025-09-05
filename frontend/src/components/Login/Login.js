import React, { useState } from "react";
import axios from "axios";
import assets from "../assets/h.jpg";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = { email, password };

    try {
      const response = await axios.post("http://localhost:8080/login", loginDetails);
      if (response.data.id) {
        localStorage.setItem("userId", response.data.id);
        alert("Login Successful");
        window.location.href = "/userProfile";
      } else {
        alert("Invalid Credentials");
      }
    } catch (err) {
      alert("Invalid Credentials");
      window.location.href = "/login";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Left side image */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${assets})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Right side form */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "320px", width: "100%" }}>
          {/* Title */}
          <h2
            style={{
              marginBottom: "0.4rem",
              fontSize: "1.6rem",
              fontWeight: "600",
              color: "black",
              textAlign: "center",
            }}
          >
            Login
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "gray",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Enter your email and password
          </p>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label"
                style={{ fontSize: "0.9rem" }}
              >
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ fontSize: "0.9rem" }}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label"
                style={{ fontSize: "0.9rem" }}
              >
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ fontSize: "0.9rem" }}
              />
            </div>

            <div className="d-grid mb-3">
              <button
                type="submit"
                className="btn btn-primary bsb-btn-xl"
                style={{ width: "100%", fontSize: "1rem" }}
              >
                Login
              </button>
            </div>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.9rem" }}>
            If you don't have an account,{" "}
            <span
              onClick={() => (window.location.href = "/")}
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
