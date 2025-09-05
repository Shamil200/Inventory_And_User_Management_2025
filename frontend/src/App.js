import React from "react";
import {Route, Routes } from "react-router";
import Homee from "./components/Homee/Homee";
import AddItem from "./components/Admin/AddItem/AddItem";
import DisplayItem from "./components/Admin/DisplayItem/DisplayItem";
import Register from "./components/User/Register/Register";
import Login from "./components/Login/Login";
import UserProfile from "./components/User/UserProfile/UserProfile";
import UpdateProfile from "./components/User/UpdateProfile/UpdateProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/home" element={<Homee />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/allitems" element={<DisplayItem />} />
          <Route path="/adminLog" element={<AdminLogin />} />
          {/*user management*/}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/updateprofile/:id" element={<UpdateProfile />} />
          
          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
