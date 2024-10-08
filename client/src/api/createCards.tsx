import { API_URL } from "./config";
import { TDeck } from "./getAllDecks";

export async function createCards(deckId: string, text: string) : Promise<TDeck> {
    const response = await fetch(`${API_URL}/api/decks/${deckId}/cards`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });
      return response.json();
}