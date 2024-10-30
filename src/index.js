import "./style.css"
import { createList } from "./logic.js";
import { updateCards } from "./domUpdates.js";

let allLists = [];
const newListDialog = document.querySelector("#new-list-dialog");
const addItemDialog = document.querySelector("#add-item-dialog");
const newListForm = document.querySelector("#new-list-form");
const addItemForm = document.querySelector("#add-item-form");
const listName = document.querySelector("#list-name");
const listDesc = document.querySelector("#list-desc");

addEventListener("click", (event) => {
  if (event.target.id == "new-list-btn") {
    newListDialog.showModal();
  }
  else if (event.target.id == "cancel-list") {
    event.preventDefault();
    newListDialog.close();
  }
  else if (event.target.id == "cancel-item") {
    event.preventDefault();
    addItemDialog.close();
  }
  else if (event.target.type == "checkbox") {
    const listIndex = event.target.id.split("-")[1];
    const itemIndex = event.target.id.split("-")[3];
    console.log(`listnum = ${listIndex}, itemNum = ${itemIndex}`);
    const targetList = allLists[listIndex];

    if (event.target.checked){
      targetList.markComplete(itemIndex);
    }
    else {
      targetList.markIncomplete(itemIndex);
    }
    
    console.log(targetList.getIncompleteItems());
    console.log(targetList.getCompletedItems());
    updateCards(allLists);
    storeListsLocally();
  }
  else if (event.target.classList[0] == "add-item-btn") {
    // TODO: add item to list
    addItemDialog.showModal();
    const listIndex = event.target.classList[1].split("-")[1];
    const targetList = allLists[listIndex];

    addItemForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const itemTitle = document.querySelector("#item-title");
      const itemDesc = document.querySelector("#item-desc");
      const itemPriority = document.querySelector("#item-priority");
      const itemDueDate = document.querySelector("#item-duedate");
      targetList.createNewItem(itemTitle.value, itemDesc.value, itemDueDate.value, itemPriority.value);
      console.log(allLists);
      updateCards(allLists);
      storeListsLocally();
      console.log(targetList.getIncompleteItems());
      addItemForm.reset();
      addItemDialog.close();
    }, { once: true });

    console.log(listIndex);
  }
});

newListForm.addEventListener("submit", (event) => {
    event.preventDefault();
    allLists.push(createList(listName.value, listDesc.value));
    console.log(allLists);
    updateCards(allLists);
    storeListsLocally();
    newListForm.reset();
    newListDialog.close();
});

function storeListsLocally(){
  let listObjects = [];

  for (let list of allLists){
    const listObj = {
      name: list.name,
      description: list.description,
      incompleteItems: list.getIncompleteItems(),
      completedItems: list.getCompletedItems(),
    }

    listObjects.push(listObj);


  }
  
  localStorage.setItem("listData", JSON.stringify(listObjects));

}