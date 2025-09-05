import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  header: {
    color: "#2c5d2f",
    fontWeight: "600",
    fontSize: "2rem",
    textTransform: "uppercase",
    marginBottom: "1rem",
    textAlign: "center",
  },
  submitBtn: {
    backgroundColor: "#2c5d2f",
    borderColor: "#2c5d2f",
    textTransform: "uppercase",
    fontWeight: "600",
    padding: "10px",
  },
};

function UpdateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        const userData = response.data;
        setFormData({
          fullname: userData.fullname || "",
          email: userData.email || "",
          password: userData.password || "",
          phone: userData.phone || "",
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/user/${id}`, formData);
      alert("Profile update successful");
      navigate("/userProfile", { replace: true });
    } catch (error) {
      alert("Error updating data");
      console.error(error);
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="card p-4 shadow" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 style={styles.header}>Update Profile</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label text-uppercase fw-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="form-control"
              value={formData.fullname}
              onChange={onInputChange}
              required
              style={{ height: "38px" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-uppercase fw-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={onInputChange}
              required
              style={{ height: "38px" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-uppercase fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={onInputChange}
              required
              style={{ height: "38px" }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="form-label text-uppercase fw-semibold">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={onInputChange}
              required
              style={{ height: "38px" }}
            />
          </div>

          <button type="submit" className="btn btn-success w-100 text-uppercase fw-semibold" style={styles.submitBtn}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;

