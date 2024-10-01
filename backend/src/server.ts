import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/db';
import Decks from './models/Decks';


const app = express();
connectDB();
dotenv.config();

app.use(cors());
app.use(express.json());

app.post('/', async (req: Request, res: Response) => {
  try {
    const { decks } = req.body;
    const newDecks = new Decks(decks);
    const createdDecks = await newDecks.save();
    res.json(createdDecks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
