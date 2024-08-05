import express from 'express';
import userRoutes from './routes/userRoutes';

import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors());



app.use('/api', userRoutes);




// Handle invalid API endpoints
app.use((req, res) => {
    res.status(404).json({ message: 'You are hitting the wrong API URL' });
  });

export default app;
