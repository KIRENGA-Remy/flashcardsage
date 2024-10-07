import { API_URL } from "./config";

export type TDeck = {
  _id: string;
  cards: string[],
  title: string;
}

export async function getAllDecks(): Promise<TDeck[]> {
  const response = await fetch(`${API_URL}/api/decks`);
  const decksGot = await response.json();  
  return decksGot.thiDecks || decksGot;
}
