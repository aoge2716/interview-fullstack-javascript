import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cityRoutes from './src/routes/cityRoutes';

dotenv.config();
  
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/cities', cityRoutes);

const startServer = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("mongoDB connected");

    app.listen(port, ()=>{
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    });
  } catch (error){
    console.error("mongoDB Connection Error: ", error);
    process.exit(1);
  };
};


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

startServer();