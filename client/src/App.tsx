import { useEffect, useState } from "react";

interface Deck {
  _id: string;
  title: string;
}

function App() {
  const [title, setTitle] = useState<string>("");  
  const [decks, setDecks] = useState<Deck[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('http://localhost:4502/api/decks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });
    setTitle("");
  }

  useEffect(() => {
    async () => {
    const response =   await fetch("http://localhost:4502/api/decks")
    const allDecks = await response.json();
    setDecks(allDecks)
    }
  })

  return (
    <div className='min-h-screen bg-gradient-to-tr from-sky-400 to-white flex flex-row justify-center'>
      <ul>
        {
          decks.map((deck) => (
            <li key={deck._id}>{deck.title}</li>
          ))
        }
      </ul>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
        <label className="text-2xl font-semibold text-black mb-4">Decks Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4 w-80"
          placeholder="Enter deck title"
        />
        <button
          type="submit"
          className="bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-600 transition duration-300"
        >
          Create Deck
        </button>
      </form>
    </div>
  );
}

export default App;
