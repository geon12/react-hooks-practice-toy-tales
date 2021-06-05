import React, { useState } from "react";

function ToyForm({onSubmit}) {
  const initialFormData = {name: "" , image: "" , likes: 0}
  const [formData,setFormData] = useState({name: "" , image: "" , likes: 0})

  function handleFormChange(event) {
    const name = event.target.name
    const value = event.target.value

    setFormData({...formData,[name]: value})
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    onSubmit(formData)
    setFormData(initialFormData)
  }
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleFormSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleFormChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleFormChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
