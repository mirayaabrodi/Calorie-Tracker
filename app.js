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
    logData: function () {
      return data;
    },
  };
})();

// --------------------------------------------------------------------------------------------------

// UI Controller
const UICtrl = (function () {
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
  };
})();

// --------------------------------------------------------------------------------------------------

// App Controller
const AppCtrl = (function (itemCtrl, UICtrl) {
  // Public Mehtods
  return {
    init: function () {
      // Fetch item from data structure
      const item = itemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemList(item);
    },
  };
})(ItemCtrl, UICtrl);

AppCtrl.init();
