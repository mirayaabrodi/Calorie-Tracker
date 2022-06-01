// Storage Controller

// --------------------------------------------------------------------------------------------------

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, caloies) {
    this.id = id;
    this.name = name;
    this, (caloies = caloies);
  };

  // --------------------------------------------------------------------------------------------------

  // Data structor
  const data = {
    items: [
      {
        id: 0,
        name: "Steak Dinner",
        calories: 1200,
      },
      {
        id: 1,
        name: "Cookie",
        calories: 400,
      },
      {
        id: 2,
        name: "Eggs",
        calories: 200,
      },
    ],
    currentItem: null, // if we click on settings (on a item), we want that paticular item to be the current item
    totalCalories: 0,
  };

  // Access data in console
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;
      // Ireate ID
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
    logData: function () {
      return data;
    },
  };
})();

// --------------------------------------------------------------------------------------------------

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#meal-input",
    itemCaloriesInput: "#calorie-input",
  };

  // Public Mehods
  return {
    populateItemList: function (items) {
      // loop thru items, make each one to a list item, then insert it to ul (item-list)
      let html = "";
      items.forEach(function (item) {
        html += `<li class="collection-item" id="${item.id}">
        <strong>${item.name}</strong> <em>${item.calories}</em>
        <a href="#" class="setting">
            <i class="edit-item fa-solid fa-gear"></i>
        </a>
    </li>`;
      });

      // Insert list items
      document.querySelector(".item-list").innerHTML = html;
    },

    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();

// --------------------------------------------------------------------------------------------------

// App Controller
const App = (function (itemCtrl, UICtrl) {
  // Load Event Listeners
  const loadEventListeners = function () {
    // Get Ui selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn);
    addEventListener("click", itemAddAubmit);
  };

  // Add item submit
  const itemAddAubmit = function (e) {
    //  Get form input from UI Controller
    const input = UICtrl.getItemInput();

    if (InputDeviceInfo.name !== "" && InputDeviceInfo.calories !== "") {
      // Add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    }

    e.preventDefault();
  };

  // Public Mehtods
  return {
    init: function () {
      // Fetch item from data structure:
      // getting item from the item controller, and putting in them in a variable
      const item = itemCtrl.getItems();

      // Populate list with items (pasisng the item in)
      UICtrl.populateItemList(item);
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

App.init();
