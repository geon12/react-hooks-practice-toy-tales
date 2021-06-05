import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, donateToy, addLikes}) {

  function populateToys() {
    return toys.map(toy => <ToyCard key={toy.id} toy={toy} donateToy={donateToy} addLikes={addLikes}/>)
  }
  return (
    <div id="toy-collection">{populateToys()}</div>
  );
}

export default ToyContainer;
