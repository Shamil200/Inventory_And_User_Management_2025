import React, { useState } from 'react'
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSubmit = async (e) =>{
        e.preventDefault();
        const loginDetails = {email,password};

        try{
            const responce = await axios.post('http://localhost:8080/login', loginDetails);
            if(responce.data.id){
                localStorage.setItem('userId',responce.data.id)
                alert('Login Successfull');
                window.location.href ="/userProfile";
            }else{
                alert('Invalid Credentials');
                
            }
        }catch(err){
             alert('Invalid Credentials');
             window.location.href="/login";
        }
    }

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>

               

                <label for="email">email</label><br />
                <input type='email' id='email' name='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                <br />

                <label for="password">password</label><br />
                <input type='password' id='password' name='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                <br />
        
                <button type='submit' className='fom_btn'>Login</button>

            </form>
    </div>
  )
}

export default Login
