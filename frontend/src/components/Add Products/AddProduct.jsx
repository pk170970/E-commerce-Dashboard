import React,{useState} from 'react';
import './addproduct.css';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const API_URL= process.env.REACT_APP_URL;
    const [product,setProduct]= useState({
        product_name:"",
        product_price:"",
        product_category:"",
        product_company:""
    });

    
    // const user_Id= JSON.parse(localStorage.getItem("user"))._id;

     async function handleSubmit(e){
        e.preventDefault();
        try {
            const result= await fetch(`${API_URL}/add-product`,{
            method:'post',
            body:JSON.stringify(product),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
            }
        });
        const data= await result.json();
        toast.success("Products are added.");
        
       setProduct({
        product_name:"",
        product_price:"",
        product_category:"",
        product_company:""
       })
        
        } catch (error) {
            toast.warning("Please enter all the details correctly");
        }
        // console.log(product);
    }

     function handleProducts(e){
        const {name,value}= e.target;
        setProduct((prevProducts)=>{
            return {...prevProducts,[name]:value}
        });
    }

    const myStyle={
        color:"white",
        backgroundColor:"black"
    };

    const myButton={
        color:"white",
        backgroundColor:"black"
    }

    return (

        <div className='container-product'>
            <ToastContainer/>
            <h3>Add your Products here</h3>
            <form onSubmit={handleSubmit}>

                <div className="add-form">
                    <input style={myStyle} className="add-input" type="text" name="product_name" required onChange={handleProducts} value={product.product_name} placeholder="Enter the Product Name" />
                </div>

                <div className="add-form">
                    <input style={myStyle} className="add-input" type="number" name="product_price" required onChange={handleProducts} value={product.product_price} placeholder="Enter the Product Price in Rupees" />
                </div>

                <div className="add-form">
                    <input style={myStyle} className="add-input" type="text" name="product_category" required onChange={handleProducts} value={product.product_category} placeholder="Enter the Product Category" />
                </div>

                <div className="add-form">

                    <input style={myStyle} className="add-input" type="text" name="product_company" required onChange={handleProducts} value={product.product_company} placeholder="Enter the Product Company" />
                </div>


                <button style={myButton}  className="btn" type='submit'>Add Products</button>
            </form>
        </div>
    )
}

export default AddProduct;