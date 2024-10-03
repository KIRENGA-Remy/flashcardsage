import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/db';
import Decks from './models/Decks';

const app = express();
connectDB();
dotenv.config();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.post('/api/decks', async (req: Request, res: Response) => {
  try {
    const title  = req.body.title
    const newDeck = new Decks({title});
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
