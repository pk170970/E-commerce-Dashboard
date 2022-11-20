import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signin.css";

const SignIn = () => {
    const navigate = useNavigate();
    const API_URL= process.env.REACT_APP_URL;

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    }, []);


    const [userData, setUser] = useState({
        email: "",
        password: "",
    });


    function handleChange(e) {
        const { name, value } = e.target;

        setUser(prevData => {
            return { ...prevData, [name]: value };
        })
    }



    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await fetch(`${API_URL}/api/login`, {
                method: 'post',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await result.json();
            console.log(data);
            if (data.user.email && data.user.firstName && data.auth) {

                toast.success("You are successfully login in.")

                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('auth', JSON.stringify(data.auth));

                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                toast.warning("Please Enter the correct details")
            }

        } catch (error) {
            // console.log(error.response.data.message);
            toast.error("Please Enter the correct details");
        }
    }


    return (
        <div className="container-signin">
            <ToastContainer />
            <h1>Welcome to E-commerce Application!</h1>
            <h3>Sign in Page</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control-signin">
                    <label>Email</label>
                    <input type="text" placeholder="Enter your Name" name="email" required onChange={handleChange} value={userData.email} />
                </div>

                <div className="form-control-signin">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your Password" name="password" required onChange={handleChange} value={userData.password} />
                </div>

                <button className="signin-btn" type='submit'>Sign In</button>
            </form>
        </div>
    )
}

export default SignIn;