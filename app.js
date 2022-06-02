// Storage Controller

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: [
      // {id: 0, name: 'Steak Dinner', calories: 1200},
      // {id: 1, name: 'Cookie', calories: 400},
      // {id: 2, name: 'Eggs', calories: 300}
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItembyId: function (id) {
      let found = null;
      // loop thru items
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    getTotalCalories: function () {
      let total = 0;
      // Loop thru items and add calories
      data.items.forEach(function (item) {
        total += item.calories;
      });
      // set total calorie in data structure
      data.totalCalories = total;
      // Return Total
      return data.totalCalories;
    },
    logData: function () {
      return data;
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: ".item-list",
    addBtn: ".add-meal-btn",
    updateBtn: ".edit-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemNameInput: "#meal-input",
    itemCaloriesInput: "#calorie-input",
    totalCalories: ".calories-result",
  };

  // Public methods
  return {
    populateItemList: function (items) {
      let html = "";

      items.forEach(function (item) {
        html += `
        <li class="collection-item" id="${item.id}">
                    <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                    <a href="#" class="setting">
                        <i class="edit-item fa-solid fa-gear"></i>
                    </a>
                </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: function (item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Create li element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = ` <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                    <a href="#" class="setting"><i class="edit-item fa-solid fa-gear"></i>
                    </a>`;
      // Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addListItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value =
        ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent =
        totalCalories;
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },

    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Edit Icon click
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemUpdateSubmit);
  };

  // Add item submit
  const itemAddSubmit = function (e) {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      //  Get the total Calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add Total calories to the Ui
      UICtrl.showTotalCalories(totalCalories);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = function (e) {
    if (e.target.classList.contains("fa-gear")) {
      // Get list item id (item-0, item-1,...)
      const listId = e.target.parentNode.parentNode.id;

      // Breakk into an array
      const listIdArr = listId.split("-");

      // get actual id
      const id = parseInt(listIdArr[1]);

      // Get Item
      const itemToEdit = ItemCtrl.getItembyId(id);
      console.log(itemToEdit);

      // set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // add item to form
      UICtrl.addListItemToForm();
    }
    e.preventDefault();
  };

  // Public methods
  return {
    init: function () {
      // Clear edit state / set initial set
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      //  Get the total Calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add Total calories to the Ui
      UICtrl.showTotalCalories(totalCalories);
      // Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
