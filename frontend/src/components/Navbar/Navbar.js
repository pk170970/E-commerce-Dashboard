import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
    const navigate= useNavigate();
    const auth= localStorage.getItem("user");
    const logout= ()=>{
        localStorage.clear();
        navigate('/signup');
    }
    console.log(JSON.parse(auth));
    return (
        <div className='flex'>
            { auth ?  
                <ul className='list'>
                <img className='logo' src= "https://cdn.hashnode.com/res/hashnode/image/upload/v1611414881588/PeTOwVocj.png" alt="logo" />
                    <li className='list-item'><Link to = "/">Products List</Link></li>
                    <li className='list-item'><Link to = "/add">Add Products</Link></li>
                    {/* <li className='list-item'><Link to = "/update/:id">Update Products</Link></li> */}
                    <li className='list-item'><Link to = "/profile">Profile</Link></li>
                    <li className='list-item'><Link onClick={logout} to = "/signup">Logout &nbsp; {JSON.parse(auth).firstName}</Link></li>
                </ul>
             : 
            <ul className='list'>
            <li className='list-item'><Link to = "/signup">SignUp</Link></li>
                    <li className='list-item'><Link to = "/signin">SignIn</Link></li>
            </ul> }
        </div>
    )
}

export default Navbar;