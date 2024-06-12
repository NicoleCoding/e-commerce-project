const products =
  [
    {
        "id": "KFNKGGF",
        "name": "Apple tree",
        "description": "Apples are the by far the easiest fruits to grow. You can buy a tree or several here, ready to be planted and with just a little care, you can enjoy delicious apples!",
        "price": "150",
        "image": "images/appletree.jpg"
    },
    {   "id": "FDSKKGL",
        "name": "Cherry tree",
        "description": "Cherry trees require more thought than apple trees. They require drained and fertile soil in order to grow properly in addition to 8 hours sunlight a day.",
        "price": "300",
        "image": "images/cherrytree.jpg"
    },
    {   "id": "FGGDSFD",
        "name": "Lemon tree",
        "description": "Lemon trees are more sensitive to cold compared to other fruit trees. Therefore it is important to plant lemon trees closer to the house or even indoors in a pot.",
        "price": "200",
        "image": "images/lemontree.jpg"
    },
    {   "id": "OKPGPG",
        "name": "Orange tree",
        "description": "Orange trees are similar to lemon trees, sensitive to cold. Therefore take care to plant it in a pot or appropriate spot. Here at us you can get a potted orange tree.",
        "price": "220",
        "image": "images/orangetree.jpg"
     }
  ];  


let productsElem = document.getElementById("products"); // Container for the products
let basket = JSON.parse(localStorage.getItem("data")) || []; // Items which were selected, are stored inside this basket array. Basket either has the added products which were saved inside local storage or is empty.

// Displays products on the webpage.
function renderProducts() {
  return (productsElem.innerHTML = products.map((product) => { // Creates a new array for every object in products and the new array is displayed inside the productsElem.
    let { id, name, price, description, image } = product; // Destructuring the object.
    let searchProduct = basket.find((product) => product.id === id) || []; // Search an item with id in basket. Otherwise return an empty array if nothing found.
    return `<div id=product-id-${id} class="item m-2">
              <img width="250" height="250" src=${image} alt="">
              <div class="details">
                <h3>${name}</h3>
                <p>${description}</p>
                <div class="price-quantity">
                  <h2>${price}:- </h2>
                  <div class="btn-group" role="group" aria-label="Quantity-buttons">
                  <button type="button" class="btn btn-primary px-2 m-2">
                   <i onclick="incrementProduct(${id})" class="bi bi-plus-lg">Add item to basket</i>
                  </button>
                   <div id=${id} class="quantity">
                     ${searchProduct.quantity === undefined ? 0 : searchProduct.quantity}
                   </div>
                  <button type="button" class="btn btn-primary px-2 m-2">
                    <i onclick="decrementProduct(${id})" class="bi bi-dash-lg">Remove item from basket</i>
                  </button>
                 </div>
                </div>
              </div>
            </div>`;}).join("")); // Template literal is returned and contains the data for each product




}
renderProducts(); 

// Increase the quantity of the product.
function incrementProduct(id) {
  let selectedItem = id; // Variable for the item which is being selected.
  let searchProduct = basket.find((product) => product.id === selectedItem.id); // Tries to find an item with a specific id in the basket.
  if (searchProduct === undefined) { 
    basket.push({             // If the search determines that an item does not exist in the basket yet, it will push a new object inside the basket.
      id: selectedItem.id,
      quantity: 1,
    });
  } else { 
    searchProduct.quantity += 1;  // If the item already exists, the quantity is increased by 1.
  }


  updateBasketIcon(selectedItem.id); // Runs this function and updates the selected item.
  localStorage.setItem("data", JSON.stringify(basket)); // The data inside the basket is stored in local storage.

}

// Decrease the quantity of the product, works the same way as the increment function but in reverse. Also if the quantity is 0, nothing happens.
function decrementProduct(id) {
  let selectedItem = id;
  let searchProduct = basket.find((product) => product.id === selectedItem.id);
  if (searchProduct === undefined)
    return;
  else if (searchProduct.quantity === 0) // Nothing happens if quantity is equal to 0.
    return;
  else {
    searchProduct.quantity -= 1;
  }
  updateBasketIcon(selectedItem.id); 
  basket = basket.filter((basketItem) => basketItem.quantity !== 0); // Filters the objects inside the basket which do not have a quantity of 0 and these are passed inside an array.
  localStorage.setItem("data", JSON.stringify(basket)); 


}

// Updates the basket icon on the productpage.
function updateBasketIcon(id) {
  let searchProduct = basket.find((product) => product.id === id);
  document.getElementById(id).innerHTML = searchProduct.quantity; // Element with id "id" displays the quantity of all products inside the basket.
  calculationBasketIcon(); // Runs the calculation of all added products.
}

// Calculates quantity of the items in the basket which are displayed at the basket icon.
function calculationBasketIcon() {
  let basketAmount = document.getElementById("basketAmount"); // The basket icon is declared and assigned to the element with id "basketAmount".
  basketAmount.innerHTML = basket.map((basketItem) => basketItem.quantity).reduce((totalQuantity, itemQuantity) => totalQuantity + itemQuantity, 0); // Create an array with only the quantities of the products inside the basket, then all the quantities are summed up with the reduce function and this is displayed inside the basketIcon element.

}

calculationBasketIcon();


