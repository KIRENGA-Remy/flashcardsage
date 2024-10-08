import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDecks } from "./api/createDecks";
import { getAllDecks, TDeck } from "./api/getAllDecks";
import { deleteDecks } from "./api/deleteDecks";

function App() {
  const [title, setTitle] = useState<string>("");  
  const [decks, setDecks] = useState<TDeck[]>([]);

  const fetchDecks = async () => {
    try {
      const data = await getAllDecks();
      setDecks(data);
      
    } catch (error) {
      console.error('Failed to fetch decks:', error);
    }
    fetchDecks()
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const deck = await createDecks(title);
      setDecks([...decks, deck]);
      setTitle("");
    } catch (error) {
      console.error('Failed to create deck:', error);
    }
  }
  useEffect(() => {
    fetchDecks();
  }, []);

  const handleDelete = async (deckId: string) => {
    try {
      await deleteDecks(deckId)
      setDecks(decks.filter((deck) => deck._id !== deckId));
    } catch (error) {
      console.error('Failed to delete deck:', error);
    }
  };
  
  return (
    <div className='min-h-screen bg-gradient-to-tr from-sky-400 to-white flex flex-col items-center justify-center'>
      <form onSubmit={handleSubmit} className="flex flex-col my-4 items-center justify-center py-6 px-20 bg-white shadow-lg rounded-lg">
        <label className="text-2xl font-semibold text-black mb-4">Decks Title</label>
        <div className="flex flex-col">
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
            className="bg-sky-500 text-white p-1 rounded-lg hover:bg-sky-600 transition duration-300"
          >
            Create Deck
          </button>
        </div>
      </form>
      <ul className="flex flex-col gap-2">
        {
          decks.map((deck) => (
            <li className="bg-white p-4 m-2 w-[360px] shadow-md rounded-lg flex justify-between" key={deck._id}>
              <Link to={`decks/${deck._id}/cards`}>{deck.title}</Link>
              <div className="text-red-600 font-semibold px-2 cursor-pointer" onClick={() => handleDelete(deck._id)}>X</div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
