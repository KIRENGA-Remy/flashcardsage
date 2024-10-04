import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/db';
import Decks from './models/Decks';

const app = express();
connectDB();
dotenv.config();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true
}));
app.use(express.json());

app.post('/api/decks', async (req: Request, res: Response) => {
  try {
    const title  = req.body.title
    const newDeck = new Decks({title});
    const createdDeck = await newDeck.save()
    res.json({message: "Successfully deleted" ,createdDeck})
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
});

app.get('/api/decks', async (req: Request, res: Response) => {
  try {
    const getDecks = await Decks.find();
    res.json({message: "Decks are found" ,getDecks})
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
});

app.get('/api/decks/:id', async (req: Request, res: Response) => {
  try {
    const id  = req.params.id
    const getDeck = await Decks.findById(id)
    res.json({message:"Deck is found ", getDeck})
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
});

app.put('/api/decks/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const newTitle  = req.body.title
    const updatedDeck = await Decks.findByIdAndUpdate(
      id, 
      {$set: { title: newTitle }}, 
      { new: true }
    )
    res.json({message: "Successfully updated" ,updatedDeck})
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
});

app.delete('/api/decks/:id', async (req: Request, res: Response) => {
  try {
    const id  = req.params.id
    const deletedDeck = await Decks.findByIdAndDelete(id);
    res.json({ message: "Successfully deleted"})
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
