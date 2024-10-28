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

  const addItem = function (item) {
    incompleteItems.push(item);
  }

  const removeItem = function (index) {
    incompleteItems.splice(index, 1);
  }

  const markComplete = function (index) {
    completedItems.push(incompleteItems[index])
  }

  const getIncompleteItems = () => incompleteItems;
  const getCompletedItems = () => completedItems;

  return { name, description, createNewItem, removeItem, markComplete, getCompletedItems, getIncompleteItems }
}
