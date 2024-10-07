import mongoose, { Schema, Document } from 'mongoose';

export interface IDecks extends Document {
    title: string;
    cards: string[]
  }
  const DecksSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true },
    cards: { type: [String], default: [] }
  });

  export default mongoose.model<IDecks>('Decks', DecksSchema);
