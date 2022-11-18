import React from 'react'
import { useState, useEffect } from 'react';
import './productlist.css';
import {  toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';


const Products = () => {
  const API_URL= process.env.REACT_APP_URL;
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProductList();
  }, [])

  async function getProductList() {
    const response = await fetch(`${API_URL}/products`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}` // this auth has been set in signin.jsx page
      }
    });
    const results = await response.json();
    setProduct(results);
    // console.log(results);
    if (results.length < 1) {
      toast.warning("Add some Products, your product list is empty");
    }
  }
  // console.log(product);
  async function handleClick(id) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'delete',
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
      }
    });
    toast.success("Product Deleted");
    const results = await response.json();
    getProductList();
  }

  async function handleSearch(e) {
   
      let key = e.target.value;
      if (key !== "") {
        let response = await fetch(`${API_URL}/search/${key}`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
          }
        });
        let data = await response.json();
        setProduct(data);
      }else{
        getProductList();
      }

  }

  return (
    <>
        <ToastContainer />
      <div className="top">
        <h1 className='list-heading'>List of All the Products</h1>
        <input type="search" name="search" id="search" placeholder='Search' onChange={handleSearch} />
      </div>
      <div className="table">

        <div className="table-header">
          <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">S.NO</a></div>
          <div className="header__item"><a id="name" className="filter__link" href="#">Name</a></div>
          <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">PRICE</a></div>
          <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">CATEGORY</a></div>
          <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">COMPANY</a></div>
          <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">DELETE PRODUCTS</a></div>
          <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">UPDATE PRODUCTS</a></div>
        </div>
        {product.length > 0 ? product.map((item, index) => (
          <div className="table-content" key={index + 1}>
            <div className="table-row" >
              <div className="table-data">{index + 1}</div>
              <div className="table-data">{item.product_name}</div>
              <div className="table-data">₹ {item.product_price}</div>
              <div className="table-data">{item.product_category}</div>
              <div className="table-data">{item.product_company}</div>
              <div className="table-data delete-bg">
                <div className="delete-data" onClick={() => handleClick(item._id)}>Delete</div>
              </div>
              <div className="table-data delete-bg">
                <div className="delete-data" ><Link to={`/updates/${item._id}`}>Update</Link></div>
              </div>
            </div>
          </div>
        )) :
          <h1 className="notfound-heading">No Products Found</h1>
        }

      </div>
    </>
  )
}

export default Products;