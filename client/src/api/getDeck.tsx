import { API_URL } from "./config";
import { TDeck } from "./getAllDecks";

export async function getDeck(deckId: string): Promise<TDeck> {
  const response = await fetch(`${API_URL}/api/decks/${deckId}`);
  return response.json();  
}
