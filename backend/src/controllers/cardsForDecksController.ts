import { Request, Response } from 'express';
import Decks from '../models/Decks';

export default async function cardsForDecksController(req: Request, res: Response) {
  try {
    const deckId = req.params.deckId;
    const deck = await Decks.findById(deckId);
    if (!deck) {
      return res.status(400).json({ message: "Deck with this ID does not exist" });
    }
    
    const { text } = req.body;
    deck.cards.push(text);
    await deck.save();
    res.json(deck);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', err });
  }
}
