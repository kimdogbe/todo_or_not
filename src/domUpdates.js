export { updateCards };
import bin from "../images/bin.svg";

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
  incompleteItems.append(createIncompleteItemList(list, index));

  const completeItems = document.createElement("div");
  completeItems.className = "list-items complete";
  completeItems.append(createCompletedItemList(list, index));

  const dueDate = document.createElement("div");
  dueDate.className = "due-date";
  // dueDate.innerHTML = "No date set";
  card.append(listName, listDesc, incompleteItems, completeItems, dueDate);
  return card;
}

function createIncompleteItemList(list, listIndex) {
  const items = list.getIncompleteItems();
  const divElement = document.createElement("div");

  for (const [index, item] of items.entries()){
    const itemDiv = document.createElement("div");
    const checkboxElement = document.createElement("input");
    const labelElement = document.createElement("label");
    const deleteBtnElement = document.createElement("button");
    const binImage = document.createElement("img");
    binImage.src = bin;
    binImage.width = 15;
    deleteBtnElement.append(binImage);
    deleteBtnElement.classList.add("delete-item-btn");
    checkboxElement.type = "checkbox";
    checkboxElement.id = `list-${listIndex}-item-${index}`;
    labelElement.htmlFor = `list-${listIndex}-item-${index}`;
    labelElement.innerHTML = item.title;

    itemDiv.id = `list-${listIndex}-item-${index}`;
    itemDiv.append(checkboxElement, labelElement, deleteBtnElement);
    divElement.append(itemDiv);
  }

  return divElement;
}

function createCompletedItemList(list, listIndex) {
  const items = list.getCompletedItems();
  const divElement = document.createElement("div");

  for (const [index, item] of items.entries()){
    const itemDiv = document.createElement("div");
    const checkboxElement = document.createElement("input");
    const labelElement = document.createElement("label");
    const deleteBtnElement = document.createElement("button");
    const binImage = document.createElement("img");
    binImage.src = bin;
    binImage.width = 15;
    deleteBtnElement.append(binImage);
    deleteBtnElement.classList.add("delete-item-btn");
    checkboxElement.type = "checkbox";
    checkboxElement.checked = true;
    checkboxElement.id = `list-${listIndex}-item-${index}`;
    labelElement.htmlFor = `list-${listIndex}-item-${index}`;
    labelElement.innerHTML = item.title;

    itemDiv.id = `list-${listIndex}-item-${index}`;
    itemDiv.append(checkboxElement, labelElement, deleteBtnElement);
    divElement.append(itemDiv);
  }

  return divElement;
}