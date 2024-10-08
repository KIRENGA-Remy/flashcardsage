import { API_URL } from "./config";
import { TDeck } from "./getAllDecks";

export async function deleteCard(deckId:string, index: number):Promise<TDeck> {
    const response = await fetch(`${API_URL}/api/decks/${deckId}/cards/${index}`, {
        method: 'DELETE',
      });
      return response.json()
}