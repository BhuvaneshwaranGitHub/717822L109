const express=require('express');
const dotenv=require('dotenv');
const averageRoutes=require('./routes/averageRoutes');
dotenv.config();
const app=express();
const port=process.env.port || 3000;
app.use(express.json());
app.use("/numbers",averageRoutes);
app.listen(port,()=>{
    console.log('Server is running');
});