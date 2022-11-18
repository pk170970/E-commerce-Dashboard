require('dotenv').config();
require('./database/config');
const PORT = process.env.PORT || 5000;
const route= require('./Router/route');
const express = require('express');
const app = express();
const cors = require('cors');
const path= require('path');

// Middle ware
app.use(express.json());
app.use(cors());


if(process.env.NODE_ENV){
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.use("/api",route);
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    })
}else{
}
// cors issue: when we create api on backend and send request, request got block as due to security reasons in browser, we get cors error. browsser thinks that request from frontend and backend are different and throws cors error.

app.listen(PORT, () => {
    console.log("Server is running at PORT 5000");
});

