import express from 'express';
import dotenv from 'dotenv';

async function start(){
    dotenv.config({
        path: "./.env",
    });

    const app = express();
    app.get('/', (req, res)=>{
        res.send('Hello World! A');
    });

    app.listen(process.env.PORT, ()=>{
        console.log('Server is running on port ' + process.env.PORT);
    });

}

start();