const mongoose= require('mongoose');
mongoose.connect(process.env.MONGODB_URL)
.then(()=> console.log("Database connection success"))
.catch(err=>console.log(err));
