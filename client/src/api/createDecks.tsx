import { API_URL } from "./config";

export async function createDecks(title:string) {
   const response = await fetch(`${API_URL}/api/decks`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
      });
      return response.json();
}