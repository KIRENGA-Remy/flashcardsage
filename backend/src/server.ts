import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/db';
import Decks from './models/Decks';
import cardsForDecksController from './controllers/cardsForDecksController';

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
    const thiDecks= await Decks.find();
    res.json({message: "Decks are found", thiDecks })
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
});

app.get('/api/decks/:id', async (req: Request, res: Response) => {
  try {
    const id  = req.params.id
     await Decks.findById(id)
    res.json({message:"Deck is found "})
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
});

app.put('/api/decks/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const newTitle  = req.body.title
     await Decks.findByIdAndUpdate(
      id, 
      {$set: { title: newTitle }}, 
      { new: true }
    )
    res.json({message: "Successfully updated"})
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
});

app.delete('/api/decks/:id', async (req: Request, res: Response) => {
  try {
    const id  = req.params.id
     await Decks.findByIdAndDelete(id);
    res.json({ message: "Successfully deleted"})
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
});

app.post('/api/decks/:deckId/cards', async (req: Request, res: Response): Promise<void> => {
  try {
    const { deckId } = req.params;
    const { text } = req.body;

    // Find the deck by ID
    const findDeck = await Decks.findById(deckId);
    if (!findDeck) {
      res.status(404).json({ message: 'Deck not found' });
      return; // Early return to stop further execution
    }

    // Add the new card (text) to the cards array
    findDeck.cards.push(text);

    // Save the updated deck (await required here)
    await findDeck.save();

    // Respond with the updated deck
    res.status(200).json(findDeck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
