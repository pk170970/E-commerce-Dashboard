import React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "./signup.css";

const SignUp = () => {
  const API_URL= process.env.REACT_APP_URL;
  const navigate = useNavigate();

  // useEffect(() => {
  //   const auth = localStorage.getItem("auth");
  //   if (auth) {
  //     navigate('/');
  //   }
  // }, [])


  const [userData, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: ""
  });


  function handleChange(e) {
    const { name, value } = e.target;

    setUser(prevData => {
      return { ...prevData, [name]: value };
    })
  }



  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if ((userData.password === userData.cpassword) && userData.email.includes("@")) {

        const result = await fetch(`${API_URL}/api/register`, {
          method: "post",
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await result.json();
        console.log(data);

        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('auth', JSON.stringify(data.auth));

        toast.success("You are successfully Registered.");
        navigate('/');


      } else {

        toast.warning("Password and Confirm Password should be same and unique. Also Enter the valid email");
      }

    } catch (error) {
      console.log(error);
      toast.warning("Please Enter all the credentials correctly");
    }
  }


  return (
    <div className="container-big">
      <ToastContainer />
      <h1>Welcome to E-commerce Application!</h1>
      <h3>Register your Account</h3>
      <form onSubmit={handleSubmit} className="signup-form">

        <div className="form-control">
          <input type="text" name="firstName" required onChange={handleChange} value={userData.firstName} placeholder="First Name" />
        </div>

        <div className="form-control">
          <input type="text" name="lastName" required onChange={handleChange} value={userData.lastName} placeholder="Last Name" />
        </div>

        <div className="form-control">
          <input type="text" name="email" required onChange={handleChange} value={userData.email} placeholder="Email" />
        </div>

        <div className="form-control">

          <input type="password" name="password" required onChange={handleChange} value={userData.password} placeholder="Password" />
        </div>

        <div className="form-control">

          <input type="password" required name="cpassword" onChange={handleChange} value={userData.cpassword} placeholder="Confirm Password" />
        </div>

        <button className="signup-btn" type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp;