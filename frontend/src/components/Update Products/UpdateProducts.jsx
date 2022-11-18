import React, { useState, useEffect } from 'react';
import './update.css';
import { useParams, useNavigate } from 'react-router-dom';
import { toast , ToastContainer} from 'react-toastify';
// import {toast,ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const UpdateProducts = () => {
    const [update, setUpdate] = useState({
        product_name: "",
        product_price: "",
        product_category: "",
        product_company: ""
    });
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        // console.log(params);
        findData();
    }, []);

    async function findData() {
        // console.log(params);
        const response = await fetch(`${API_URL}/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
            }
        });
        const data = await response.json();
        setUpdate({
            product_name: data.product_name,
            product_price: data.product_price,
            product_category: data.product_category,
            product_company: data.product_company
        });
        // console.log(data._id === params.id)
    }

    // const user_Id= JSON.parse(localStorage.getItem("users"))._id;

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/products/${params.id}`, {
                method: 'put',
                body: JSON.stringify(update),
                headers: {
                    'Content-Type': "application/json",
                    authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
                }
            });
            const data = await response.json();
            navigate('/');

        } catch (error) {
            console.log(error);
            toast.error("Please Enter the valid data and check your internet connection")
        }
    }

    function handleProducts(e) {
        const { name, value } = e.target;
        setUpdate((prevProducts) => {
            return { ...prevProducts, [name]: value }
        });
    }

    const myStyle = {
        color: "white",
        backgroundColor: "black"
    };


    return (

        <div className='container-product'>
            <ToastContainer/>
            <h3>Update your Product here</h3>
            <form onSubmit={handleSubmit}>

                <div className="add-form">
                    <input style={myStyle} className="add-input" type="text" name="product_name" required onChange={handleProducts} value={update.product_name} placeholder="Enter the Product Name" />
                </div>

                <div className="add-form">
                    <input style={myStyle} className="add-input" type="number" name="product_price" required onChange={handleProducts} value={update.product_price} placeholder="Enter the Product Price in Rupees" />
                </div>

                <div className="add-form">
                    <input style={myStyle} className="add-input" type="text" name="product_category" required onChange={handleProducts} value={update.product_category} placeholder="Enter the Product Category" />
                </div>

                <div className="add-form">

                    <input style={myStyle} className="add-input" type="text" name="product_company" required onChange={handleProducts} value={update.product_company} placeholder="Enter the Product Company" />
                </div>


                <button className="myBtn" type='submit'>Update Product</button>
            </form>
        </div>
    )
}

export default UpdateProducts;