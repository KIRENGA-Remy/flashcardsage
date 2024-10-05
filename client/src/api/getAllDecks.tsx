export type TDeck = {
  _id: string;
  title: string;
}

export async function getAllDecks(): Promise<TDeck[]> {
  const response = await fetch("http://localhost:4502/api/decks");
  const decksGot = await response.json();  
  return decksGot.thiDecks || decksGot;
}
