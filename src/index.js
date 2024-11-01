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
    handleCheckboxToggling(event);
  }
  else if (event.target.classList[0] == "add-item-btn") {
    console.log("press");
    handleAddItem(event);
  }
  else if (event.target.classList[0] === "delete-item-btn") {
    handleDeleteItem(event);
  }
});

newListForm.addEventListener("submit", (event) => {
    event.preventDefault();
    allLists.push(createList(listName.value, listDesc.value));
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

function handleAddItem(event) {
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

    updateCards(allLists);
    storeListsLocally();

    addItemForm.reset();
    addItemDialog.close();
  }, { once: true });
}

function handleDeleteItem(event){
  const btnClicked = event.target.parentNode;
  const itemIndex = btnClicked.id.split("-")[3];
  const listIndex = btnClicked.id.split("-")[1];
  const listComplete = btnClicked.parentNode.parentNode.classList[1] === "complete" ? true : false;

  allLists[listIndex].removeItem(itemIndex, listComplete);
  updateCards(allLists);
  storeListsLocally();
}

function handleCheckboxToggling (event){
  const listIndex = event.target.id.split("-")[1];
  const itemIndex = event.target.id.split("-")[3];
  const targetList = allLists[listIndex];

  if (event.target.checked){
    targetList.markComplete(itemIndex);
  }
  else {
    targetList.markIncomplete(itemIndex);
  }
  
  updateCards(allLists);
  storeListsLocally();
}

function retrieveLocalData(){
  if (localStorage.getItem("listData")) {
    const localData = JSON.parse(localStorage.getItem("listData"));
    console.log(localData);
    
    for (let item of localData) {
      const list = createList(item.name, item.description);

      for (let completed of item.completedItems) {
        list.createCompletedItem(completed.title, completed.description, completed.dueDate, completed.priority);
      }
      for (let incomplete of item.incompleteItems) {
        list.createNewItem(incomplete.title, incomplete.description, incomplete.dueDate, incomplete.priority);
      }

      allLists.push(list);
    }

    updateCards(allLists);
  }
}

retrieveLocalData();