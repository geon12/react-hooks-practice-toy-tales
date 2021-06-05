import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const URL = 'http://localhost:3001/toys'

  useEffect(() => {
    fetch(URL)
      .then(resp => resp.json())
      .then(data => setToys(data))
      .catch(console.error)

  },[])

  function postToy(toy) {
    const configObj = {
      method: `POST`,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(toy)
    }
    fetch(URL,configObj)
      .then(resp => resp.json())
      .then(data => {
        setToys([...toys,data])
      })
      .catch(console.error)
  } 

  function donateToy(id) {
    fetch(`${URL}/${id}`, {method: 'Delete'})
      .then(resp => resp.json())
      .then(() => {
        const updatedToys = toys.filter(toy => toy.id !== id)
        setToys(updatedToys)
      })

  }

  function addLikes(toy) {
    const configObj = {
      method: `PATCH`,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({likes: (toy.likes + 1)})
    }
    fetch(`${URL}/${toy.id}`,configObj)
      .then(resp => resp.json())
      .then(updatedToy => {
        const updatedToys = toys.map( (toy) => toy.id === updatedToy.id ? updatedToy : toy)
        setToys(updatedToys)
      })
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onSubmit={postToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} donateToy={donateToy} addLikes={addLikes}/>
    </>
  );
}

export default App;
