import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: ''
    })
    const { fullname, email, password, phone } = user;

    const onInputChange = async (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/user", user);
        alert("Registration successful");
        navigate('/login');  // Use navigate here
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={(e) => onSubmit(e)}>

                <label for="fullname">Full Name</label><br />
                <input type='text' id='fullname' name='fullname' onChange={(e) => onInputChange(e)} value={fullname} required />
                <br />

                <label for="email">email</label><br />
                <input type='email' id='email' name='email' onChange={(e) => onInputChange(e)} value={email} required />
                <br />

                <label for="password">password</label><br />
                <input type='password' id='password' name='password' onChange={(e) => onInputChange(e)} value={password} required />
                <br />

                <label for="phone">phone</label><br />
                <input type='text' id='phone' name='phone' onChange={(e) => onInputChange(e)} value={phone} required />
                <br />
                <button type='submit' className='fom_btn'>register</button>

            </form>
        </div>
    )
}

export default Register







/*import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: ''
    })
    const {fullname, email,password, phone} =user;

    const onInputChange = async (e) =>{
        setUser({...user, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8080/user",user);
        alert("Registration successful")
            window.location.reload();
        
    }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={(e) =>onSubmit(e)}>

        <label for="fullname">Full Name</label><br />
        <input type='text' id='fullname' name='fullname' onChange={(e) => onInputChange(e)} value={fullname} required />
        <br />

        <label for="email">email</label><br />
        <input type='text' id='email' name='email' onChange={(e) => onInputChange(e)} value={email} required />
        <br />

        <label for="password">password</label><br />
        <input type='text' id='password' name='password' onChange={(e) => onInputChange(e)} value={password} required />
        <br />

        <label for="phone">phone</label><br />
        <input type='text' id='phone' name='phone' onChange={(e) => onInputChange(e)} value={phone} required />
        <br />
        <button type='submit' className='fom_btn'>register</button>

      </form>
    </div>
  )
}

export default Register
*/