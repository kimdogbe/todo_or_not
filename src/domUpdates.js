export { updateCards };

function updateCards(lists) {
  const content = document.querySelector("#content");
  content.innerHTML = "";
  
  for (const [index, list] of lists.entries()) {
    const listCard = createCard(list, index);
    content.append(listCard);
  }
}

// TODO: get list the parent add-item-btn belongs to

// TODO: create function to update list items after new item added to list

function createCard(list, index) {
  const card = document.createElement("div");
  card.className = "list list-" + index;

  const listName = document.createElement("div");
  listName.className = "list-name";
  listName.innerHTML = list.name;
  const listDesc = document.createElement("div");
  listDesc.className = "list-desc";
  listDesc.innerHTML = list.description;

  const incompleteItems = document.createElement("div");
  incompleteItems.className = "list-items incomplete";
  const addItemBtn = document.createElement("button");
  addItemBtn.className = "add-item-btn list-" + index;
  addItemBtn.innerHTML = "Add item";

  incompleteItems.append(addItemBtn);
  incompleteItems.append(document.createElement("ul"));

  const completeItems = document.createElement("div");
  completeItems.className = "list-items complete";
  completeItems.append(document.createElement("ul"));

  const dueDate = document.createElement("div");
  dueDate.className = "due-date";
  // dueDate.innerHTML = "No date set";
  card.append(listName, listDesc, incompleteItems, completeItems, dueDate);
  return card;
}