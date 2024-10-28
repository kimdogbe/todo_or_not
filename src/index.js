import "./style.css"
import { createList } from "./logic.js";
import { updateCards } from "./domUpdates.js";

console.log("We out here");

let allLists = [];
const dialogElement = document.querySelector("dialog");
const formElement = document.querySelector("form");
const listName = document.querySelector("#list-name");
const listDesc = document.querySelector("#list-desc");

addEventListener("click", (event) => {
  if(event.target.id == "new-list-btn") {
    dialogElement.showModal();
  }
  else if(event.target.id == "cancel-list") {
    event.preventDefault();
    dialogElement.close();
  }
});

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    allLists.push(createList(listName.value, listDesc.value));
    console.log(allLists);
    updateCards(allLists);
    dialogElement.close();
});