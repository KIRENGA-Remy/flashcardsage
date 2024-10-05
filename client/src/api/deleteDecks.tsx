export async function deleteDecks(deckId:string) {
    const response = await fetch(`http://localhost:4502/api/decks/${deckId}`, {
        method: 'DELETE',
      });
      return response.json()
}