import express from 'express';
import "dotenv/config"
import dbConnect from './src/data/db.mjs';
import { PORT } from './src/config/env.mjs';
import rootRouter from './src/routes/index.mjs';


const server = express();
server.use(express.json());

server.get('/',(req ,res)=>{
    res.send('Hello, World!');
})
server.use('/api/vi/', rootRouter);


dbConnect()
.then(()=>{
    console.log('Database connected successfully');
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
});