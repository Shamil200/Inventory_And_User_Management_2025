import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProfile() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    phone: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        const itemData = response.data;
        setFormData({
          fullname: itemData.fullname || '',
          email: itemData.email || '',
          password: itemData.password || '',
          phone: itemData.phone || '',
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  }, [id]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/user/${id}`, formData);
      alert('Profile update successful');
      navigate('/userProfile', { replace: true });
    } catch (error) {
      alert('Error updating data');
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="fullname">Full Name</label><br />
        <input
          type="text"
          id="fullname"
          name="fullname"
          onChange={onInputChange}
          value={formData.fullname}
          required
        /><br />

        <label htmlFor="email">Email</label><br />
        <input
          type="email"
          id="email"
          name="email"
          onChange={onInputChange}
          value={formData.email}
          required
        /><br />

        <label htmlFor="password">Password</label><br />
        <input
          type="password"
          id="password"
          name="password"
          onChange={onInputChange}
          value={formData.password}
          required
        /><br />

        <label htmlFor="phone">Phone</label><br />
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={onInputChange}
          value={formData.phone}
          required
        /><br />

        <button type="submit" className="form_btn">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;




/*import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProfile() {
    const {id} = useParams();
    const[formData,setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: '',
    })
const navigate = useNavigate();

useEffect(()=>{
    const fetchData = async () =>{
        try{
            const response = await axios.get(`http://localhost:8080/user/${id}`);
            const itemData = response.data;
            setFormData({
                fullname: itemData.fullname || '',
                email: itemData.email || '',
                password: itemData.password || '',
                phone: itemData.phone || '',
            });
        }catch (error){
            console.error('Error fetching data', error);
        }
        
    }
    fetchData();
},[id]);

const onInputChange = (e) =>{
    const { name, value } = e.target
    setFormData({...formData, [name]: value});
}

const onSubmit = async (e) =>{
    e.preventDefault();
    try{
        const response = await axios.put(`http://localhost:8080/user/${id}`,formData);
        alert('profile update successfull')
        window.location.href = '/userProfile'
        navigate('/user',{replace: true});
    }catch (error){
        alert('Error Updating Data',error);
    }
}
  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit= {onSubmit}>
        <label for="fullname">Full Name</label>
        <br />
        <input
          type="text"
          id="fullname"
          name="fullname"
          onChange={onInputChange}
          value={formData.fullname}
          required
        />
        <br />

        <label for="email">email</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          nChange={onInputChange}
          value={formData.email}
          required
        />
        <br />

        <label for="password">password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          nChange={onInputChange}
          value={formData.password}
          required
        />
        <br />

        <label for="phone">phone</label>
        <br />
        <input
          type="text"
          id="phone"
          name="phone"
          nChange={onInputChange}
          value={formData.phone}
          required
        />
        <br />
        <button type="submit" className="fom_btn">
          register
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;
*/