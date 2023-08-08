import express from 'express'
import cors from 'cors';
import posts from './routes/postRoute.js';
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URL;


app.use(express.json())
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.use('/posts', posts);

mongoose.set('strictQuery', false)
mongoose
  .connect(URI)
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('err', err);
  });