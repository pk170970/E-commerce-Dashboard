require('dotenv').config();
require('./database/config');
const PORT = process.env.PORT || 5000;
const jwtKey= process.env.JWTKEY;

const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./model/User');
const Product = require('./model/Product');
const jwt = require('jsonwebtoken');
const path= require('path');

// Middle ware
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, '../frontend/build')));

// cors issue: when we create api on backend and send request, request got block as due to security reasons in browser, we get cors error. browsser thinks that request from frontend and backend are different and throws cors error.

app.post('/register', async (req, res) => {

    const { firstName, lastName, email, password, cpassword } = req.body;
    if (!(email && password && cpassword && firstName && lastName)) {
        res.status(400).send("Enter all the fields ");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400).send("User already exist, move to sign in page");
    }

    const userData = new User({ firstName, lastName, email, password });
    //you can use bcrypt to encrypt the password
    let user = await userData.save();
    jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (error, token) => {
        if (!error) {
            res.send({user, auth: token });
            result.password = undefined;
            result.cpassword = undefined;
        } else {
            res.send("jwt error, Please try after sometime or check your net connectivity");
        }
    });
});


app.post('/login', async (req, res) => {

    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send("Enter your correct email address, password and confirm password");
    }

    let user = await User.findOne({ email });
    if (user) {
        if (user.password === password) {
            jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (error, token) => {
                if (!error) {
                    res.send( {user, auth: token });
                    user.password = undefined;
                    user.cpassword = undefined;
                } else {
                    res.send("jwt error, Please try after sometime or check your net connectivity");
                }
            });
        } else {
            res.send("Incorrect Password");
        }
    } else {
        res.status(400).send('User does not exist')
    }
});

// add products
app.post('/add-product', verifyToken,  verifyToken,  async (req, res) => {
    const product = new Product(req.body);
    const product_data = await product.save();
    res.send(product_data);
});

// show all products
app.get('/products', verifyToken, async (req, res) => {
    const products = await Product.find();
    if (products.length >= 0) {
        res.send(products);
    } else {
        res.status(400).send("Product not found");
    }
})


// delete products
app.delete('/products/:id',verifyToken, async (req, res) => {
    const response = await Product.deleteOne({ _id: req.params.id });
    res.send(response);
});

// Update Products
// 1. For searching an item using id which needs to be updated 
app.get('/products/:id',verifyToken, async (req, res) => {
    const response = await Product.findOne({ _id: req.params.id });
    if (response) {
        res.send(response);
    } else {
        res.send('No record found');
    }
})

// 2. now saving the modified data using id
app.put('/products/:id', verifyToken, async (req, res) => {
    let response = await Product.updateOne(
        // jiske base pe update karana hai
        { _id: req.params.id },
        { $set: req.body }
    );
    console.log(req.body);
    res.send(response);
});

// for searching products
app.get('/search/:key', verifyToken,  async (req, res) => {
    const response = await Product.find({
        "$or": [
            { product_name: { $regex: req.params.key } },
            { product_category: { $regex: req.params.key } },
            { product_company: { $regex: req.params.key } },
        ]
    });
    if (response) {
        res.send(response);
    } else {
        res.send("Not found");
    }
});


// for profile details
app.get('/users',verifyToken, async (req, res) => {

    const {email} = req.body;
    const response = await User.findOne({email});
    res.send(response);
    // console.log(response);
})

// Created authentication middleware to verify the user with token and then proceed to visit dashboard
function verifyToken(req,res,next){
    let token = req.headers.authorization;
    if(token){
        token= (token.split(" ")[1]);
        jwt.verify(token,jwtKey,(err,valid)=>{
            if(!err){
                console.log(valid);
                next();
            }else{
                res.status(401).send("Please enter the valid token");
            }
        })
    }else{
        res.status(403).send("Please add token with header")
    }
}


app.listen(PORT, () => {
    console.log("Server is running at PORT 5000");
});

