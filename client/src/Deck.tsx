import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCards } from "./api/createCards";
import { TDeck } from "./api/getAllDecks";
// import { createDecks } from "./api/createDecks";
// import { getAllDecks, TDeck } from "./api/getAllDecks";
// import { deleteDecks } from "./api/deleteDecks";

function Deck() {
//   const [title, setTitle] = useState<string>("");  
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { deckId } = useParams();

//   const fetchDecks = async () => {
//     try {
//       const data = await getAllDecks();
//       setDecks(data);
//       console.log(data);
      
//     } catch (error) {
//       console.error('Failed to fetch decks:', error);
//     }
//     fetchDecks()
//   };

async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!deckId) {
      setError("Deck ID is missing."); // Handle error
      return;
    }
    try {
      const deck = await createCards(deckId, text);
      console.log("deck:", deck);
      setText(""); // Clear the text only after successful submission
    } catch (error) {
      console.error('Failed to create text:', error);
      setError('Failed to create card. Please try again.');
    }
    
  }
  
//   useEffect(() => {
//     fetchDecks();
//   }, []);

//   const handleDelete = async (deckId: string) => {
//     try {
//       await deleteDecks(deckId)
//       setDecks(decks.filter((deck) => deck._id !== deckId));
//     } catch (error) {
//       console.error('Failed to delete deck:', error);
//     }
//   };
  
  return (
    <div className='min-h-screen bg-gradient-to-tr from-sky-400 to-white flex flex-col items-center justify-center'>
      <form onSubmit={handleSubmit} className="flex flex-col my-4 items-center justify-center py-6 px-20 bg-white shadow-lg rounded-lg">
        <label className="text-2xl font-semibold text-black mb-4">Card Text</label>
        <div className="flex flex-col">
          <input
            type="text"
            name="text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4 w-80"
            placeholder="Enter card Text"
          />
          <button
            type="submit"
            className="bg-sky-500 text-white p-1 rounded-lg hover:bg-sky-600 transition duration-300"
          >
            Create Text
          </button>
        </div>
      </form>
      {/* <ul className="flex flex-col gap-2">
        {
          decks.map((deck) => (
            <li className="bg-white p-4 m-2 w-[360px] shadow-md rounded-lg flex justify-between" key={deck._id}>
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
              <div className="text-red-600 font-semibold px-2 cursor-pointer" onClick={() => handleDelete(deck._id)}>X</div>
            </li>
          ))
        }
      </ul> */}
    </div>
  );
}

export default Deck;
