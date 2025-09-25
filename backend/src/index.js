import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectToDatabase } from './DB/database.Db.js';
import userRouter from './Routes/user.Routes.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: '*', // Change this to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users',userRouter)

connectToDatabase()
.then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
})
.catch((error) => {
  console.error('Failed to start server due to database connection error:', error);
  process.exit(1); // Exit the process with failure
}); 


