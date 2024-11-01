export { createList } ;

function createListItem (title, description='', dueDate, priority='medium') {
  let completed = false;

  const setCompleted = function () {
    completed = true;
  }

  const getIsCompleted = () => this.completed;

  return { title, description, dueDate, priority, setCompleted, getIsCompleted }
}

function createList (name, description) {
  let incompleteItems = [];
  let completedItems = [];

  const createNewItem = function (title, description, dueDate, priority) {
    let newItem = createListItem(title, description, dueDate, priority);
    addItem(newItem);
  }

  const createCompletedItem = function (title, description, dueDate, priority) {
    let newItem = createListItem(title, description, dueDate, priority);
    completedItems.push(newItem);
  }

  const addItem = function (item) {
    incompleteItems.push(item);
  }

  const removeItem = function (index, itemComplete) {
    if (itemComplete) {
      completedItems.splice(index, 1);
    }
    else {
      incompleteItems.splice(index, 1);
    }
  }

  const markComplete = function (index) {
    completedItems.push(incompleteItems[index]);
    removeItem(index, false);
    console.log(completedItems);
  }

  const markIncomplete = function (index) {
    incompleteItems.push(completedItems[index]);
    removeItem(index, true);
    console.log(completedItems);
  }

  const getIncompleteItems = () => incompleteItems;
  const getCompletedItems = () => completedItems;

  return { name, description, createNewItem, createCompletedItem, removeItem, markComplete, markIncomplete, getCompletedItems, getIncompleteItems }
}
