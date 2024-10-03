import { useState } from "react"

function App() {
  const [title, setTitle] = useState("");
  async function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    await fetch('https://localhost:4502/api/decks', {
      method: 'POST',
      body: JSON.stringify({title}),
      headers: {
        "Content-Type":"application/json"
      }
    }),
    setTitle("")
  }

  return (
  <div className='bg-slate-400 border text-red-600  font-bold'>
    <form onSubmit={handleSubmit}>
      <label>Decks Title</label>
      <input type="text" 
      value={title}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)}}
       />
       <button type="submit">Create Decks</button>
    </form>
    </div>
  )
}

export default App
