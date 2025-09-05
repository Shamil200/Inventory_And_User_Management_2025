import axios from "axios";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found");
      setLoading(false);
      return;
    }
    axios
      .get(`http://localhost:8080/user/${userId}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching user data");
        setLoading(false);
      });
  }, []);

  const updateNavigate = (id) => {
    window.location.href = `/updateProfile/${id}`;
  };

  const deleteAccount = async (userId) => {
    const confirmation = window.confirm("Are you sure you want to delete account?");
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8080/user/${userId}`);
        alert("Account deleted successfully");
        localStorage.removeItem("userId");
        window.location.href = "/";
      } catch (error) {
        alert("Error deleting account");
        console.error(error);
      }
    }
  };

  if (loading) return <div className="d-flex justify-content-center mt-5"><span>Login...</span></div>;
  if (error) return <div className="d-flex justify-content-center mt-5"><span>{error}</span></div>;

  return (
    <div className="container">
      <div className="d-flex justify-content-end mt-3">
        <a href="/home" className="btn btn-link">HOME</a>
        <a href="/userProfile" className="btn btn-link text-success font-weight-bold">PROFILE</a>
        <a href="/login" className="btn btn-link">LOGOUT</a>
      </div>
      <h2 className="text-center mt-4 text-success">USER PROFILE</h2>
      <div className="d-flex justify-content-center mt-4">
        <div className="card p-4" style={{ minWidth: "350px", maxWidth: "420px" }}>
          {user ? (
            <>
              <div className="mb-2">
                <strong>Full Name:</strong> {user.fullname}
              </div>
              <div className="mb-2">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="mb-2">
                <strong>Phone:</strong> {user.phone}
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-success" onClick={() => updateNavigate(user.id)}>
                  UPDATE
                </button>
                <button className="btn btn-danger" onClick={() => deleteAccount(user.id)}>
                  DELETE
                </button>
              </div>
            </>
          ) : (
            <span>No user found</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;





























