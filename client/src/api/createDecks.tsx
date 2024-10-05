export async function createDecks(title:string) {
   const response = await fetch('http://localhost:4502/api/decks', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
      });
      return response.json();
}