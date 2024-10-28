export { updateCards };

function updateCards(lists) {
  const content = document.querySelector("#content");
  content.innerHTML = "";
  
  for (const [index, list] of lists.entries()) {
    const listCard = createCard(list, index);
    content.append(listCard);
  }
}

function createCard(list, index) {
  const card = document.createElement("div");
  card.className = "list listNum" + index;

  const listName = document.createElement("div");
  listName.innerHTML = list.name;
  const listDesc = document.createElement("div");
  listDesc.innerHTML = list.description;

  const incompleteItems = document.createElement("div");
  incompleteItems.className = "list-items incomplete";
  incompleteItems.append(document.createElement("ul"));

  const addItemBtn = document.createElement("button");
  addItemBtn.className = "add-item-btn";

  const completeItems = document.createElement("div");
  completeItems.className = "list-items complete";
  completeItems.append(document.createElement("ul"));

  const dueDate = document.createElement("div");
  dueDate.className = "due-date";
  // dueDate.innerHTML = "No date set";
  card.append(listName, listDesc, incompleteItems, completeItems, dueDate);
  return card;
}