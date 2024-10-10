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
  const { deckId } = useParams(); // Extract deckId from the URL

  // Fetch the deck and cards when deckId changes
  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      try {
        const newDeck = await getDeck(deckId)
        console.log(newDeck.deckOne.cards);
        
        setDeck(newDeck.deckOne);
        setCards(newDeck.deckOne.cards || []); // Ensure cards is always an array
      } catch (error) {
        setError("Failed to fetch deck. Please try again.");
        console.error(error);
      }
    }

    // Clear previous state when navigating between decks
    setDeck(undefined);
    setCards([]);

    fetchDeck();
  }, [deckId]);

  // Handle creating a new card
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!deckId) {
      setError("Deck ID is missing.");
      return;
    }
    try {
      const { cards: updatedCards } = await createCard(deckId, text);
      setCards(updatedCards); // Update cards with the newly created card
      setText(""); // Clear the input after submission
    } catch (error) {
      console.error("Failed to create card:", error);
      setError("Failed to create card. Please try again.");
    }
  }

  // Handle deleting a card
  const handleDeleteCard = async (index: number) => {
    try {
      if (!deckId) return;
      await deleteCard(deckId, index); // Delete the card from the server
      setCards((prevCards) => prevCards.filter((_, i) => i !== index)); // Remove the card locally
    } catch (error) {
      console.error("Failed to delete card:", error);
      setError("Failed to delete card. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-400 to-white flex flex-col items-center justify-center">
      {/* Form for adding a new card */}

      {/* Display error if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display all cards */}
      <ul className="flex flex-col justify-center gap-2">
        <h2 className="flex justify-center font-semibold text-2xl">{deck?.title}</h2>
        {cards.map((card, index) => (
          <li className="bg-white p-4 m-2 w-[360px] shadow-md rounded-lg flex justify-between" key={index}>
            {card}
            <div className="text-red-600 font-semibold px-2 cursor-pointer" onClick={() => handleDeleteCard(index)}>
              X
            </div>
          </li>
        ))}
      </ul>
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
            Create Card
          </button>
        </div>
      </form>
    </div>
  );
}

export default Deck;
