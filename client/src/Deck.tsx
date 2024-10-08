// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { createCard } from "./api/createCard";
// import { TDeck } from "./api/getAllDecks";
// import { getDeck } from "./api/getDeck";
// import { deleteCard } from "./api/deleteCard";
// // import { createDecks } from "./api/createDecks";
// // import { getAllDecks, TDeck } from "./api/getAllDecks";
// // import { deleteDecks } from "./api/deleteDecks";

// function Deck() {
//   const [deck, setDeck] = useState<TDeck | undefined>()
//   const [cards, setCards] = useState<string[]>([]);  
//   const [text, setText] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const { deckId } = useParams();
// useEffect(() => {
//    async function fetchDeck() {
//       if(!deckId) return;
//       const newDeck = await getDeck(deckId);
//       setDeck(newDeck);
//       setCards(newDeck.cards);
//    }
//     fetchDeck()
//   }, [deckId])

// async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!deckId) {
//       setError("Deck ID is missing."); // Handle error
//       return;
//     }
//     try {
//       const { cards: serverCards} = await createCard(deckId, text);
//       setCards(serverCards)
//       setText(""); // Clear the text only after successful submission
//     } catch (error) {
//       console.error('Failed to create text:', error);
//       setError('Failed to create card. Please try again.');
//     }
    
//   }

//   const handleDeleteCard = async (index: number) => {
//     try {
//     if(!deckId) return;
//      const cardToDelete = await deleteCard(deckId, index)
//       setCards(cardToDelete.cards);
//     } catch (error) {
//       console.error('Failed to delete deck:', error);
//     }
//   };
  
//   return (
//     <div className='min-h-screen bg-gradient-to-tr from-sky-400 to-white flex flex-col items-center justify-center'>
//       <form onSubmit={handleSubmit} className="flex flex-col my-4 items-center justify-center py-6 px-20 bg-white shadow-lg rounded-lg">
//         <label className="text-2xl font-semibold text-black mb-4">Card Text</label>
//         <div className="flex flex-col">
//           <input
//             type="text"
//             name="text"
//             value={text}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
//             className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4 w-80"
//             placeholder="Enter card Text"
//           />
//           <button
//             type="submit"
//             className="bg-sky-500 text-white p-1 rounded-lg hover:bg-sky-600 transition duration-300"
//           >
//             Create Text
//           </button>
//         </div>
//       </form>
//       <ul className="flex flex-col gap-2">
//         {
//           cards.map((card, index) => (
//             <li className="bg-white p-4 m-2 w-[360px] shadow-md rounded-lg flex justify-between" key={index}>
//               {card}
//               <div className="text-red-600 font-semibold px-2 cursor-pointer" onClick={() => handleDeleteCard(index)}>X</div>
//             </li>
//           ))
//         }
//       </ul>
//     </div>
//   );
// }

// export default Deck;











import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard } from "./api/createCard";
import { TDeck } from "./api/getAllDecks";
import { getDeck } from "./api/getDeck";
import { deleteCard } from "./api/deleteCard";

function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { deckId } = useParams();

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards || []); // Ensure cards is always an array
    }
    fetchDeck();
  }, [deckId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!deckId) {
      setError("Deck ID is missing."); // Handle error
      return;
    }
    try {
      const { cards: serverCards } = await createCard(deckId, text);
      setCards(serverCards);
      setText(""); // Clear the text only after successful submission
    } catch (error) {
      console.error('Failed to create text:', error);
      setError('Failed to create card. Please try again.');
    }
  }

  const handleDeleteCard = async (index: number) => {
    try {
      if (!deckId) return;

      // Call deleteCard with the index
      await deleteCard(deckId, index); // Assuming deleteCard takes deckId and index
      // Update the local cards state to remove the card
      setCards((prevCards) => prevCards.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Failed to delete card:', error);
      setError('Failed to delete card. Please try again.'); // User feedback
    }
  };

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
      {error && <p className="text-red-500">{error}</p>} {/* Show error message if exists */}
      <ul className="flex flex-col gap-2">
        {cards.map((card, index) => (
          <li className="bg-white p-4 m-2 w-[360px] shadow-md rounded-lg flex justify-between" key={card}>
            {card}
            <div className="text-red-600 font-semibold px-2 cursor-pointer" onClick={() => handleDeleteCard(index)}>X</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Deck;
