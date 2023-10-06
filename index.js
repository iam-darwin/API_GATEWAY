const express =require("express");
const morgan = require('morgan')
const rateLimit=require("express-rate-limit")
const { createProxyMiddleware } = require('http-proxy-middleware');

const app=express();

const PORT=3000;

const startAPIGateway=async()=>{

    const apiLimiter = rateLimit({
        windowMs: 1 * 60 * 1000, // 1 minute
        limit: 5,
    })

    

    app.use(morgan('combined'))
    app.use(apiLimiter)
    app.use('/flightservice', createProxyMiddleware({ target: 'http://localhost:7500/',changeOrigin:true}));
    app.use('/bookingService', createProxyMiddleware({ target: 'http://localhost:2000/',changeOrigin:true}))
    app.get("/home",(req,res)=>{
        return res.json({
            message:"welcome to home page"
        })
    })

    app.listen(PORT,(req,res)=>{
        console.log("SEVRER STARTED WORKING at 3000");   
    })

}

startAPIGateway()