import React, { useState } from "react";




function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const { username, password } = credentials;

  const onInputChange = (e) => {
    setCredentials({
      ...credentials, [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '123') {
      alert('login success');
      window.location.href = '/allitems';
    } else {
      alert('Invalid Credentials');
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
    {/*  <div
        style={{
          flex: 1,
          backgroundImage: `url(${assets})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />*/}

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
            Admin Login
          </h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label"
                style={{ fontSize: "0.9rem" }}
              >
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                onChange={onInputChange}
                value={username}
                required
                className="form-control"
                style={{ fontSize: "0.9rem" }}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label"
                style={{ fontSize: "0.9rem" }}
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                onChange={onInputChange}
                value={password}
                required
                className="form-control"
                style={{ fontSize: "0.9rem" }}
              />
            </div>

            <div className="d-grid mb-3">
              <button
                type='submit'
                className='btn btn-primary bsb-btn-xl'
                style={{ width: "100%", fontSize: "1rem" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
