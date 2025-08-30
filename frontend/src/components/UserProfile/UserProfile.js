import axios from 'axios';
import React, { useEffect, useState } from 'react'


function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // get user id from local storage
        const userId = localStorage.getItem('userId');
        // if there is no userId, you can redirect to show error
        if(!userId){
            setError('User ID not found');
            setLoading(false);
            return;
        }
        // fech user data from API
        axios.get(`http://localhost:8080/user/${userId}`)
            .then(response =>{
                setUser(response.data);
                setLoading(false);
            })
            .catch(error =>{
                setUser('Error feching user data');
                setLoading(false);
            });
}, []);

 const updateNavigate = (id) => {
    window.location.href = `/updateProfile/${id}`;
  };


const deleteAccount = async (userId) => {
  const confirmation = window.confirm('Are you sure you want to delete account?');
  if (confirmation) {
    try {
      await axios.delete(`http://localhost:8080/user/${userId}`);
      alert('Account deleted successfully');
      localStorage.removeItem('userId');
      window.location.href = '/register';
    } catch (error) {
      alert('Error deleting account');
      console.error(error);
    }
  }
};







/*
  // delete function
const deleteAccount = async () =>{
    //delete confirmation dialog
    const confirmation = 
    window.confirm('Are you sure you want to delete account?');
    if(confirmation){
        try{
            //send delete request
            await axios.delete(`http://localhost:8080/user/${user.Id}`);
            //sucess alert
            alert('Account delete successfully');
            //remove user data from loca storage
            localStorage.removeItem('userId');
            //redirect to the page
            window.location.href = '/register';
        }catch (error){
            //error alert
            alert('Error delete account');
        }
    }
}
    */
if (loading)return<p>Login...</p>;
if(error)return <p>{error}</p>;
  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
            <p>Full name :{user.fullname}</p>
            <p>email :{user.email}</p>
            <p>password :{user.password}</p>
            <p>phone :{user.phone}</p>
            <button onClick={() => updateNavigate(user.id)}>Update</button>
            <button onClick={() => deleteAccount(user.id)}>Delete</button>

        </div>
      ) : (
        <p>no user found</p>
      )}
    </div>
  )
}

export default UserProfile
