import { Request, Response } from 'express';
import Video from '../models/videoModel';

import path from 'path';

export const uploadVideo = async (req: Request, res: Response) => {
  const { title } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join('upload', file.filename);

  try {
    const video = await Video.create({ title, filePath });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload video.' });
  }
};

export const getVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos.' });
  }
};
