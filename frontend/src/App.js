import React from "react";
import {Route, Routes } from "react-router";
import Homee from "./components/Homee/Homee";
import AddItem from "./components/AddItem/AddItem";
import DisplayItem from "./components/DisplayItem/DisplayItem";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import UserProfile from "./components/UserProfile/UserProfile";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Homee />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/allitems" element={<DisplayItem />} />
          <Route path="/allitems" element={<DisplayItem />} />
          {/*User Management */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/updateProfile/:id" element={<UpdateProfile />} />
          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
