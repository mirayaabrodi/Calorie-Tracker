// Storage Controller

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, caloies) {
    this.id = id;
    this.name = name;
    this, (caloies = caloies);
  };




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




// UI Controller
const UICtrl = (function () {
  // Public Mehods
  return {};
})();

// App Controller
const AppCtrl = (function (itemCtrl, UICtrl) {
  // Public Mehtods
  return {
    init: function () {
      console.log("Initializing App...");
      const item = itemCtrl.getItems();

      console.log(item)
    },
  };
})(ItemCtrl, UICtrl);

AppCtrl.init();
