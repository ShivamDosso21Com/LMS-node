import express from 'express';
import userRoutes from './routes/userRoutes';
import uploadRoutes from './routes/upload';
import notesRoutes from './routes/notesRoutes';
import videoRoutes from './routes/videoRoutes';

import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());


// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Use the upload router for handling file uploads
app.use('/api', uploadRoutes);

app.use('/api', userRoutes);
app.use('/api', notesRoutes);

app.use('/api', videoRoutes);


// Handle invalid API endpoints
app.use((req, res) => {
    res.status(404).json({ message: 'You are hitting the wrong API URL' });
  });

export default app;
