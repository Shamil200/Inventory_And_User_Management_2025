import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/h.jpg"; // image path

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });

  const { fullname, email, password, phone } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8080/checkEmail?email=${email}`
      );
      if (response.data) {
        alert("Email already exists");
      } else {
        await axios.post("http://localhost:8080/user", user);
        alert("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      alert("Error during registration");
      console.error(error);
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
          {/* Title and Subtitle */}
          <h2
            style={{
              marginBottom: "0.4rem",
              fontSize: "1.6rem",
              fontWeight: "600",
              color: "black",
              textAlign: "center",
            }}
          >
            Registration
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "gray",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Enter your details to register
          </p>

          {/* Form Starts */}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label
                htmlFor="fullname"
                className="form-label"
                style={{ fontSize: "0.9rem" }}
              >
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="form-control"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => {
                  const re = /^[A-Za-z\s]*$/;
                  if (re.test(e.target.value)) onInputChange(e);
                }}
                required
                style={{ fontSize: "0.9rem" }}
              />
            </div>

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
                onChange={onInputChange}
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
                onChange={onInputChange}
                required
                style={{ fontSize: "0.9rem" }}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="phone"
                className="form-label"
                style={{ fontSize: "0.9rem" }}
              >
                Phone <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                maxLength="10"
                pattern="[0-9]{10}"
                title="Please enter exactly 10 digits."
                value={phone}
                onChange={(e) => {
                  const re = /^[0-9\b]{0,10}$/;
                  if (re.test(e.target.value)) onInputChange(e);
                }}
                required
                style={{ fontSize: "0.9rem" }}
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="iAgree"
                name="iAgree"
                className="form-check-input"
                required
              />
              <label
                htmlFor="iAgree"
                className="form-check-label text-secondary"
                style={{ cursor: "pointer", fontSize: "0.85rem" }}
              >
                I agree to the{" "}
                <a href="#!" className="link-primary text-decoration-none">
                  terms and conditions
                </a>
              </label>
            </div>

            <div className="d-grid mb-3">
              <button
                className="btn btn-primary bsb-btn-xl"
                type="submit"
                style={{ width: "100%", fontSize: "1rem" }}
              >
                Register
              </button>
            </div>
          </form>

          <hr className="border-secondary-subtle" />

          <p className="m-0 text-secondary text-center" style={{ fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <a href="/login" className="link-primary text-decoration-none">
              Sign in
            </a>
          </p>

          <p
            className="m-0 text-secondary text-center mt-3"
            style={{ fontSize: "0.9rem" }}
          >
            Or sign in as Admin?{" "}
            <a href="/adminLog" className="link-primary text-decoration-none">
              LogIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
