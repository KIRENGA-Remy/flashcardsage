import mongoose, { Schema, Document } from 'mongoose';

export interface IDecks extends Document {
    title: string;
  }

  const DecksSchema: Schema = new mongoose.Schema({
    title:{ type: String, required: true }
  });

  export default mongoose.model<IDecks>('Decks', DecksSchema);
