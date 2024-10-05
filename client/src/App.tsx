// import { useEffect, useState } from "react";

// interface Deck {
//   _id: string;
//   title: string;
// }

// function App() {
//   const [title, setTitle] = useState<string>("");  
//   const [decks, setDecks] = useState<Deck[]>([]);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     await fetch('http://localhost:4502/api/decks', {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ title })
//     });
//     setTitle("");
//   }

//   useEffect(() => {
//     const fetchDecks = async () => {
//       const response = await fetch("http://localhost:4502/api/decks");
//       const data = await response.json();
//       const allDecks = data.getDecks || []
//       console.log(allDecks);
//       setDecks(allDecks);
//     };
//     fetchDecks(); 
//   }, []);
  
//   return (
//     <div className='min-h-screen bg-gradient-to-tr from-sky-400 to-white flex flex-col items-center justify-center'>
//       <form onSubmit={handleSubmit} className="flex flex-col my-4 items-center justify-center py-6 px-20 bg-white shadow-lg rounded-lg">
//         <label className="text-2xl font-semibold text-black mb-4">Decks Title</label>
//         <div className="flex flex-col">
//         <input
//           type="text"
//           name="title"
//           value={title}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
//           className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4 w-80"
//           placeholder="Enter deck title"
//         />
//         <button
//           type="submit"
//           className="bg-sky-500 text-white p-1 rounded-lg hover:bg-sky-600 transition duration-300"
//         >
//           Create Deck
//         </button>
//         </div>
//       </form>
//       <ul className="flex flex-col gap-2">
//       {
//     decks.map((deck) => (
//       <li className="bg-white p-4 m-2" key={deck._id}>{deck.title}</li>
//     ))
// }

//       </ul>
//     </div>
//   );
// }

// export default App;









import { useEffect, useState } from "react";

interface Deck {
  _id: string;
  title: string;
}

function App() {
  const [title, setTitle] = useState<string>("");  
  const [decks, setDecks] = useState<Deck[]>([]);

  // Fetch the decks and set them in state
  const fetchDecks = async () => {
    const response = await fetch("http://localhost:4502/api/decks");
    const data = await response.json();
    const allDecks = data.getDecks || []; // handle case when there's no 'getDecks'
    setDecks(allDecks);
  };

  // Handle form submission and create a new deck
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('http://localhost:4502/api/decks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });
    
    // Clear the title input field
    setTitle("");

    // Fetch the updated list of decks after creating the new one
    fetchDecks();
  }

  const handleDelete = async (decksId: string) => {
    await fetch(`http://localhost:4502/api/decks/${decksId}`,{
      method: 'DELETE'
    })
    setDecks(decks.filter((deck) => deck._id !== decksId))
  }

  useEffect(() => {
    fetchDecks();
  }, []);
  
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
            <li className="bg-white p-4 m-2 shadow-md rounded-lg flex justify-between" key={deck._id}>
              {deck.title}
              <div className="text-red-600 font-semibold px-2 cursor-pointer" onClick={() => handleDelete(deck._id)}>X</div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
